import { cn } from '../../lib/utils/cn.js';

interface ClassNameProps {
  className?: string;
  children?: React.ReactNode;
}

export function Card({ className, children }: ClassNameProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-slate-200 bg-white shadow-sm',
        'dark:border-slate-800 dark:bg-slate-900',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: ClassNameProps) {
  return (
    <div className={cn('border-b border-slate-200 px-4 py-3 dark:border-slate-800', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: ClassNameProps) {
  return (
    <h3 className={cn('text-base font-semibold text-slate-900 dark:text-slate-100', className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children }: ClassNameProps) {
  return (
    <p className={cn('mt-1 text-sm text-slate-500 dark:text-slate-400', className)}>{children}</p>
  );
}

export function CardContent({ className, children }: ClassNameProps) {
  return <div className={cn('px-4 py-4', className)}>{children}</div>;
}

export function CardFooter({ className, children }: ClassNameProps) {
  return (
    <div className={cn('border-t border-slate-200 px-4 py-3 dark:border-slate-800', className)}>
      {children}
    </div>
  );
}

export default Card;
