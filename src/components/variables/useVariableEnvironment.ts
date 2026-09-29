import { useRef } from 'react';
import { VariableEnvironment } from '../../lib/math/variables.js';
import type { VariableDefinition } from '../../types/calculator.js';
import { useCalculator } from '../calculator/CalculatorStore.js';

/**
 * Shared persistent variable environment for UI components.
 *
 * Returns a stable `VariableEnvironment` whose definitions track
 * `state.variables` and whose live values map is refreshed synchronously
 * during render whenever the definitions array reference changes. Because
 * resolve() is pure, synchronous, and idempotent, doing it during render
 * (rather than in an effect) guarantees that memoized compilations in the
 * same render pass already see fresh values — no stale frame.
 *
 * Compiled closures read the live map at call time, so a single compiled
 * function stays valid across slider drags and animation frames.
 */
export function useVariableEnvironment(): VariableEnvironment {
  const { state } = useCalculator();
  const slotRef = useRef<{ env: VariableEnvironment; defs: VariableDefinition[] } | null>(null);
  if (slotRef.current === null) {
    slotRef.current = { env: new VariableEnvironment([]), defs: [] };
  }
  const slot = slotRef.current;
  if (slot.defs !== state.variables) {
    slot.defs = state.variables;
    slot.env.setDefinitions(state.variables);
    try {
      slot.env.resolve();
    } catch {
      // A hostile environment collapses to NaN values, never a throw.
    }
  }
  return slot.env;
}
