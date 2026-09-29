/**
 * Workstream A — 3D surface graphing library (public surface).
 *
 * Pure TypeScript, no dependencies: vector math, an orbit camera with
 * perspective projection, a z = f(x, y) sampler that compiles user
 * expressions with the project's own math engine, and a depth-sorted
 * wireframe renderer for a plain 2D canvas.
 */

export * from './vec3.js';
export * from './camera.js';
export {
  compileSurface,
  sampleSurface,
  fitSurfaceZ,
  DEFAULT_DOMAIN,
  DISPLAY_Z_SPAN,
  MIN_DIVISIONS,
  MAX_DIVISIONS,
  SurfaceCompileError,
  type SurfaceFunction,
  type SurfaceDomain,
  type SampledSurface,
  type FittedSurface,
} from './surface.js';
export {
  drawSurface,
  drawAxes,
  buildRenderQuads,
  type SurfaceRenderOptions,
  type RenderQuad,
  type AxisRenderOptions,
} from './render.js';
