import { useId, useRef, useState } from 'react';
import { cn } from '../../lib/utils/cn.js';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Array<TabItem>;
  defaultActiveId?: string;
  ariaLabel: string;
}

export function Tabs({ tabs, defaultActiveId, ariaLabel }: TabsProps) {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(() => {
    if (tabs.length === 0) return -1;
    const found = tabs.findIndex((tab) => tab.id === defaultActiveId);
    return found >= 0 ? found : 0;
  });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  if (tabs.length === 0) return null;

  const focusTab = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(tabs.length - 1);
        break;
    }
  };

  const tabId = (index: number) => `${baseId}-tab-${tabs[index]?.id ?? index}`;
  const panelId = (index: number) => `${baseId}-panel-${tabs[index]?.id ?? index}`;

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex gap-1 border-b border-slate-200 dark:border-slate-800"
      >
        {tabs.map((tab, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={tabId(index)}
              aria-selected={selected}
              aria-controls={panelId(index)}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={handleKeyDown}
              className={cn(
                'rounded-t-lg px-4 py-2 text-sm font-medium transition-colors',
                selected
                  ? 'border-b-2 border-brand-600 text-brand-700 dark:border-brand-400 dark:text-brand-300'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {activeIndex >= 0 ? (
        <div
          key={tabs[activeIndex].id}
          role="tabpanel"
          id={panelId(activeIndex)}
          aria-labelledby={tabId(activeIndex)}
          tabIndex={0}
          className="py-4"
        >
          {tabs[activeIndex].content}
        </div>
      ) : null}
    </div>
  );
}

export default Tabs;
