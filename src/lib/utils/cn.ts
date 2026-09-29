/**
 * Tiny class-name joiner (no dependency needed for this).
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
