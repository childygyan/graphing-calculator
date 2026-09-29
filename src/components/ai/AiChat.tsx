/**
 * Phase 6 AI chat UI — floating assistant panel.
 *
 * - Local-first: the intent detector answers common requests with no
 *   network; only ambiguous input hits POST /api/ai/math.
 * - The math engine stays the source of truth: commands run through the
 *   MathCommandProcessor against the existing store, and AI prose is
 *   always labeled conceptual (never presented as computed).
 * - Message history lives in component state only (no persistence).
 * - Accessible: labeled controls, focus management, Escape to close,
 *   aria-live message list. Responsive: floating panel on desktop,
 *   near-full-width sheet on mobile.
 */

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useCalculator } from '../calculator/CalculatorStore.js';
import { detectLocalIntent } from '../../lib/ai/intent.js';
import { processAiCommand } from '../../lib/ai/processor.js';
import type { ProcessorOutcome } from '../../lib/ai/processor.js';
import { requestAiCommand } from '../../lib/ai/client.js';
import type { AiChatProvider } from '../../lib/ai/client.js';
import { summarizeCalculatorState } from '../../lib/ai/context.js';
import type { AiChatHistoryItem } from '../../lib/ai/request.js';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  /** AI prose, not engine-computed — rendered with a disclaimer. */
  conceptual?: boolean;
  /** Served by the mock provider (no API key configured). */
  mock?: boolean;
  error?: boolean;
}

const SUGGESTIONS = ['Plot y = x^2', 'Zoom out', 'Let a = 2', 'What can you do?'];

const MAX_HISTORY_ITEMS = 8;

let messageCounter = 0;
function nextMessageId(): string {
  messageCounter += 1;
  return `ai-msg-${Date.now().toString(36)}-${messageCounter}`;
}

function outcomeToMessage(outcome: ProcessorOutcome, mock: boolean): ChatMessage | null {
  if (outcome.kind === 'clear_chat') return null;
  return {
    id: nextMessageId(),
    role: 'assistant',
    text: outcome.message,
    conceptual: outcome.conceptual,
    mock,
  };
}

export function AiChat() {
  const { state, dispatch } = useCalculator();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [provider, setProvider] = useState<AiChatProvider | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  // Focus the input when the panel opens; return focus on close.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      toggleRef.current?.focus();
    }
  }, [open]);

  // Keep the latest message in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, pending]);

  const applyOutcome = useCallback((outcome: ProcessorOutcome, mock: boolean) => {
    if (outcome.kind === 'clear_chat') {
      setMessages([{ id: nextMessageId(), role: 'assistant', text: 'Chat cleared.', mock }]);
      return;
    }
    const message = outcomeToMessage(outcome, mock);
    if (message) setMessages((prev) => [...prev, message]);
  }, []);

  const send = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (text.length === 0 || pending) return;
      const userMessage: ChatMessage = { id: nextMessageId(), role: 'user', text };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      const deps = {
        dispatch,
        getState: () => state,
      };

      // 1. Local-first: handle common intents with no network call.
      const local = detectLocalIntent(text, state.viewport);
      if (local) {
        if (local.command) {
          applyOutcome(processAiCommand(local.command, deps), false);
        } else if (local.reply) {
          setMessages((prev) => [
            ...prev,
            { id: nextMessageId(), role: 'assistant', text: local.reply },
          ]);
        }
        return;
      }

      // 2. Ambiguous input → server endpoint (schema-validated command).
      setPending(true);
      try {
        const history: AiChatHistoryItem[] = messages
          .slice(-MAX_HISTORY_ITEMS)
          .filter((m) => !m.error)
          .map((m) => ({ role: m.role, content: m.text.slice(0, 800) }));
        const result = await requestAiCommand(text, summarizeCalculatorState(state), history);
        if (result.ok) {
          setProvider(result.provider);
          applyOutcome(processAiCommand(result.command, deps), result.mock);
        } else {
          setMessages((prev) => [
            ...prev,
            { id: nextMessageId(), role: 'assistant', text: result.error, error: true },
          ]);
        }
      } finally {
        setPending(false);
      }
    },
    [applyOutcome, dispatch, messages, pending, state]
  );

  const close = useCallback(() => setOpen(false), []);

  const onPanelKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close();
      }
    },
    [close]
  );

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${baseId}-panel`}
        aria-label={open ? 'Close AI math assistant' : 'Open AI math assistant'}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2a7 7 0 0 0-4.9 12L2 22l8-5.1A7 7 0 1 0 12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 12h.01M12 12h.01M15.5 12h.01"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <section
          id={`${baseId}-panel`}
          role="dialog"
          aria-modal="false"
          aria-label="AI math assistant"
          onKeyDown={onPanelKeyDown}
          className="fixed bottom-[4.5rem] right-4 z-50 flex h-[min(34rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        >
          <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                AI math assistant
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {provider === 'mock'
                  ? 'Mock mode — no AI key configured'
                  : provider === 'deepseek'
                    ? 'Powered by DeepSeek'
                    : 'Ask about the graph'}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close AI math assistant"
              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div
            ref={listRef}
            role="log"
            aria-live="polite"
            aria-label="AI chat messages"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
          >
            {messages.length === 0 && !pending && (
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  I can plot functions, adjust the view, and manage sliders. Try one:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void send(s)}
                      className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                <div
                  className={
                    m.role === 'user'
                      ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-blue-600 px-3 py-2 text-sm text-white'
                      : m.error
                        ? 'max-w-[85%] rounded-2xl rounded-bl-sm border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200'
                        : 'max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-sm text-slate-800 dark:bg-slate-800 dark:text-slate-100'
                  }
                >
                  {/* Plain-text rendering: AI text is never injected as HTML. */}
                  <p className="whitespace-pre-wrap break-words">{m.text}</p>
                  {m.conceptual && (
                    <p className="mt-1 text-[11px] italic opacity-70">
                      Conceptual AI explanation — not computed by the math engine.
                    </p>
                  )}
                  {m.mock && !m.conceptual && (
                    <p className="mt-1 text-[11px] italic opacity-70">Mock response</p>
                  )}
                </div>
              </div>
            ))}
            {pending && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  Thinking…
                </div>
              </div>
            )}
          </div>

          <form
            className="border-t border-slate-200 p-3 dark:border-slate-700"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <label htmlFor={`${baseId}-input`} className="sr-only">
              Message the AI math assistant
            </label>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                id={`${baseId}-input`}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Try "plot y = x^2"'
                autoComplete="off"
                maxLength={2000}
                disabled={pending}
                className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              />
              <button
                type="submit"
                disabled={pending || input.trim().length === 0}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Send
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              AI never computes results — the math engine does. History stays in this session.
            </p>
          </form>
        </section>
      )}
    </>
  );
}

export default AiChat;
