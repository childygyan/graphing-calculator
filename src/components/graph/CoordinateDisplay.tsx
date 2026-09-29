/**
 * CoordinateDisplay — hover coordinate readout for the graph.
 * Updated imperatively through its handle (setCoordinates) so mousemove
 * never triggers a React re-render. aria-hidden: it is a visual aid only;
 * the canvas carries the accessible description.
 */

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { formatCoordinate } from '../../lib/graph/grid.js';
import type { WorldPoint } from '../../lib/graph/types.js';
import type { CalculatorShellStrings } from '../../i18n/types.js';
import { format } from '../../i18n/locales.js';

export interface CoordinateDisplayHandle {
  setCoordinates(world: WorldPoint | null): void;
}

/** CoordinateDisplay takes the shell strings for the hover readout template. */
export interface CoordinateDisplayProps {
  strings: CalculatorShellStrings;
}

const CoordinateDisplay = forwardRef<CoordinateDisplayHandle, CoordinateDisplayProps>(
  function CoordinateDisplay({ strings }, ref) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLSpanElement | null>(null);

    const template = strings.graph.coordinateTemplate;
    useImperativeHandle(
      ref,
      () => ({
        setCoordinates(world: WorldPoint | null) {
          const container = containerRef.current;
          const text = textRef.current;
          if (!container || !text) return;
          if (world === null) {
            container.style.visibility = 'hidden';
            return;
          }
          container.style.visibility = 'visible';
          text.textContent = format(template, {
            x: formatCoordinate(world.x),
            y: formatCoordinate(world.y),
          });
        },
      }),
      [template]
    );

    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{ visibility: 'hidden' }}
        className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-slate-900/75 px-2 py-1 font-mono text-xs tabular-nums text-slate-50 dark:bg-white/80 dark:text-slate-900"
      >
        <span ref={textRef} />
      </div>
    );
  }
);

export { CoordinateDisplay };
export default CoordinateDisplay;
