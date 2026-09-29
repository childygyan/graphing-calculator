import { cn } from '../../lib/utils/cn.js';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom';
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute left-1/2 z-50 max-w-xs -translate-x-1/2 whitespace-normal',
          'rounded-md bg-slate-900 px-2.5 py-1.5 text-xs text-slate-100 shadow-lg',
          'dark:bg-slate-100 dark:text-slate-900',
          'invisible opacity-0 transition-opacity',
          'group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100',
          side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
        )}
      >
        {content}
      </span>
    </span>
  );
}

export default Tooltip;
