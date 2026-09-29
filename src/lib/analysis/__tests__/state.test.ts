/** Tests for analysis state defaults and the hydration sanitizer. */

import { describe, expect, it } from 'vitest';
import { createDefaultAnalysisState, sanitizeAnalysisState } from '../state.js';

describe('createDefaultAnalysisState', () => {
  it('starts empty with 4-decimal precision', () => {
    const state = createDefaultAnalysisState();
    expect(state.precision).toEqual({ mode: 'decimals', digits: 4 });
    expect(state.markers).toEqual([]);
    expect(state.integrals).toEqual([]);
    expect(state.tangents).toEqual([]);
    expect(state.derivativePlots).toEqual([]);
    expect(state.annotations).toEqual([]);
  });
});

describe('sanitizeAnalysisState', () => {
  it('returns defaults for garbage', () => {
    expect(sanitizeAnalysisState(null)).toEqual(createDefaultAnalysisState());
    expect(sanitizeAnalysisState('nope')).toEqual(createDefaultAnalysisState());
    expect(sanitizeAnalysisState(undefined)).toEqual(createDefaultAnalysisState());
  });

  it('keeps valid entries and drops invalid ones', () => {
    const state = sanitizeAnalysisState({
      precision: { mode: 'significant', digits: 6 },
      markers: [
        { id: 'm1', kind: 'root', x: 2, y: 0, expressionId: 'e1', color: '#fff', visible: true },
        { id: 'bad', kind: 'root', x: NaN, y: 0, expressionId: 'e1', color: '#fff' },
        'garbage',
      ],
      integrals: [
        { id: 'i1', expressionId: 'e1', a: 0, b: 1, visible: true, value: 0.5, converged: true },
        { id: 'bad', expressionId: 'e1', a: 0 }, // missing b
      ],
      tangents: [{ id: 't1', expressionId: 'e1', x: 1, showTangent: true }],
      annotations: [{ id: 'a1', x: 1, y: 2, label: 'hi', color: '#000', visible: false }],
    });
    expect(state.precision).toEqual({ mode: 'significant', digits: 6 });
    expect(state.markers).toHaveLength(1);
    expect(state.integrals).toHaveLength(1);
    expect(state.tangents).toHaveLength(1);
    expect(state.tangents[0].showNormal).toBe(false);
    expect(state.annotations).toHaveLength(1);
    expect(state.annotations[0].visible).toBe(false);
  });

  it('clamps out-of-range precision digits', () => {
    const state = sanitizeAnalysisState({ precision: { mode: 'decimals', digits: 99 } });
    expect(state.precision.digits).toBe(12);
  });
});
