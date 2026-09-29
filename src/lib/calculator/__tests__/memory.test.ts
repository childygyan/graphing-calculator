/**
 * Tests for the scientific calculator memory register helpers.
 */
import { describe, expect, it } from 'vitest';
import { addToMemory, hasMemoryValue, subtractFromMemory } from '../memory.js';

describe('memory register', () => {
  it('adds the latest result to the register', () => {
    expect(addToMemory(5, 3)).toBe(8);
    expect(addToMemory(0, 2.5)).toBe(2.5);
  });

  it('subtracts the latest result from the register', () => {
    expect(subtractFromMemory(5, 2)).toBe(3);
    expect(subtractFromMemory(0, 1.5)).toBe(-1.5);
  });

  it('leaves the register untouched when there is no result yet', () => {
    expect(addToMemory(7, null)).toBe(7);
    expect(subtractFromMemory(7, null)).toBe(7);
  });

  it('reports whether the M indicator should light up', () => {
    expect(hasMemoryValue(0)).toBe(false);
    expect(hasMemoryValue(0.1)).toBe(true);
    expect(hasMemoryValue(-3)).toBe(true);
  });
});
