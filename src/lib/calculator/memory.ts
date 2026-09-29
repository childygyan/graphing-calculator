/**
 * Scientific calculator memory register (M+, M−, MR, MC). Pure UI state —
 * the stored value is only ever produced by the evaluation layer; these
 * helpers just combine it with the register. A null operand leaves the
 * register untouched so M+ with no result yet is a safe no-op.
 */

/** Add the latest result to the memory register. */
export function addToMemory(memory: number, value: number | null): number {
  return value === null ? memory : memory + value;
}

/** Subtract the latest result from the memory register. */
export function subtractFromMemory(memory: number, value: number | null): number {
  return value === null ? memory : memory - value;
}

/** True when the register holds a non-zero value (lights the M indicator). */
export function hasMemoryValue(memory: number): boolean {
  return memory !== 0;
}
