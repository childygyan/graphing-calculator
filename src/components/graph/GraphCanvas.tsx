/**
 * GraphCanvas — imperative canvas surface for the interactive graph.
 * Owns the CanvasGraphRenderer lifecycle (initialize on mount, destroy on
 * unmount) and exposes it through an imperative handle. It knows nothing
 * about the calculator store; GraphViewport drives it.
 */

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { CanvasGraphRenderer } from '../../lib/graph/renderer.js';

export interface GraphCanvasHandle {
  getRenderer(): CanvasGraphRenderer | null;
  getCanvas(): HTMLCanvasElement | null;
}

export interface GraphCanvasProps {
  className?: string;
  label?: string;
}

const DEFAULT_LABEL =
  'Interactive Cartesian coordinate graph. ' +
  'Use the graph toolbar to zoom in, zoom out, or reset the view.';

const GraphCanvas = forwardRef<GraphCanvasHandle, GraphCanvasProps>(function GraphCanvas(
  { className, label },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<CanvasGraphRenderer | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new CanvasGraphRenderer();
    // A throw here propagates to the nearest error boundary (GraphPanel's),
    // which is the honest failure mode: no half-initialized renderer.
    renderer.initialize(canvas);
    rendererRef.current = renderer;
    return () => {
      rendererRef.current = null;
      renderer.destroy();
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      getRenderer: () => rendererRef.current,
      getCanvas: () => canvasRef.current,
    }),
    []
  );

  return (
    <canvas ref={canvasRef} className={className} role="img" aria-label={label ?? DEFAULT_LABEL} />
  );
});

export { GraphCanvas };
export default GraphCanvas;
