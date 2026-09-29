import { cn } from '../../lib/utils/cn.js';

export interface PanelProps {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Panel({ title, actions, children, className }: PanelProps) {
  return (
    <section
      className={cn(
        'rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900',
        className
      )}
    >
      {title || actions ? (
        <header className="flex items-center justify-between gap-2 border-b border-slate-200 px-4 py-2.5 dark:border-slate-800">
          {title ? (
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
          ) : null}
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </header>
      ) : null}
      <div className="px-4 py-3">{children}</div>
    </section>
  );
}

export default Panel;
