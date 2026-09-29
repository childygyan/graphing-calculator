import { describe, expect, it } from 'vitest';
import { MockAiProvider, mockCommandFor } from '../providers.js';
import type { AiRequest } from '../providers.js';
import { validateAiCommand } from '../commands.js';

const CONTEXT = {
  expressions: ['y = x'],
  viewport: { xMin: -10, xMax: 10, yMin: -10, yMax: 10 },
  variables: [],
};

function requestFor(message: string): AiRequest {
  return {
    systemPrompt: 'system',
    userPrompt: `<user_request>${message}</user_request>\nRespond with exactly one JSON command object.`,
    context: CONTEXT,
  };
}

describe('MockAiProvider', () => {
  it('is deterministic: same input yields byte-identical output', async () => {
    const provider = new MockAiProvider();
    const first = await provider.complete(requestFor('plot x^2'));
    const second = await provider.complete(requestFor('plot x^2'));
    expect(second.rawText).toBe(first.rawText);
    expect(provider.name).toBe('mock');
  });

  it('every mock output passes the strict command schema', async () => {
    const provider = new MockAiProvider();
    const inputs = [
      'plot x^2',
      'graph y = sin(x)',
      'zoom in',
      'zoom out',
      'reset view',
      'let a = 2',
      'add slider b = -3.5',
      'clear',
      'help',
      'what can you do',
      'explain integrals',
      'step by step solve x+2=5',
      'hi',
      'tell me a joke',
      'plot <script>alert(1)</script>',
    ];
    for (const input of inputs) {
      const { rawText } = await provider.complete(requestFor(input));
      const parsed = JSON.parse(rawText) as unknown;
      const validated = validateAiCommand(parsed);
      expect(validated.ok, `mock output for ${JSON.stringify(input)}: ${rawText}`).toBe(true);
    }
  });

  it('plots the extracted expression', () => {
    const raw = mockCommandFor(requestFor('plot y = x^2 + 1'));
    expect(JSON.parse(raw)).toEqual({ type: 'plot_expression', expression: 'x^2 + 1' });
  });

  it('zooms relative to the provided viewport', () => {
    const out = JSON.parse(mockCommandFor(requestFor('zoom out'))) as {
      type: string;
      xMin: number;
      xMax: number;
    };
    expect(out.type).toBe('set_viewport');
    expect(out.xMin).toBe(-20);
    expect(out.xMax).toBe(20);
  });

  it('refuses to fabricate a plot from hostile input', () => {
    const parsed = JSON.parse(mockCommandFor(requestFor('plot x; DROP TABLE'))) as {
      type: string;
    };
    expect(parsed.type).toBe('unknown');
  });
});
