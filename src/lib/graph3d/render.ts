/**
 * Workstream A — depth-sorted wireframe renderer on a plain 2D canvas.
 *
 * No dependencies, no WebGL: quads are projected with the orbit camera,
 * sorted back-to-front (painter's algorithm), then each quad is filled
 * with a depth-shaded color and stroked, so nearer geometry hides what
 * is behind it. Quads touching a NaN gap are never emitted.
 */

import { project, type OrbitCamera } from './camera.js';
import type { SampledSurface } from './surface.js';
import type { Vec3 } from './vec3.js';

export interface SurfaceRenderOptions {
  /** Canvas CSS pixel width (drawing-buffer size after DPR scaling). */
  width: number;
  /** Canvas CSS pixel height. */
  height: number;
  /** World-units scale: screen = focalUnits * (width / 2 / zoomScale). */
  zoomScale: number;
  /** Fill opacity of each quad (0–1); lower shows more wireframe. */
  fillOpacity?: number;
  /** Dark-mode variant uses brighter lines on a dark canvas. */
  dark?: boolean;
}

/** A drawable quad with its corners and mean view-space depth. */
export interface RenderQuad {
  corners: [Vec3, Vec3, Vec3, Vec3];
  depth: number;
}

interface ProjectedVertex {
  sx: number;
  sy: number;
  depth: number;
}

/**
 * Projected points farther than this (in focal-length units) are treated
 * as off-screen: they sit almost in the camera plane, where perspective
 * division blows up and would paint screen-covering streaks. Dropping
 * them yields honest gaps at extreme grazing angles instead.
 */
const MAX_PROJECTED_EXTENT = 10;

function toProjected(
  vertex: Vec3 | null,
  camera: OrbitCamera,
  cx: number,
  cy: number,
  toPx: (v: number) => number
): ProjectedVertex | null {
  if (!vertex) return null;
  const projected = project(vertex, camera);
  if (
    projected.behind ||
    Math.abs(projected.x) > MAX_PROJECTED_EXTENT ||
    Math.abs(projected.y) > MAX_PROJECTED_EXTENT
  ) {
    return null;
  }
  return {
    sx: cx + toPx(projected.x),
    sy: cy - toPx(projected.y),
    depth: projected.depth,
  };
}

/**
 * Project the surface grid to screen space and collect the drawable
 * quads (all four corners finite and in front of the camera), sorted
 * back-to-front by mean depth.
 */
export function buildRenderQuads(
  surface: SampledSurface,
  camera: OrbitCamera,
  options: { width: number; height: number; zoomScale: number }
): { quads: RenderQuad[]; points: (ProjectedVertex | null)[][] } {
  const { width, height, zoomScale } = options;
  const cx = width / 2;
  const cy = height / 2;
  const toPx = (v: number): number => v * (width / 2 / zoomScale);

  const size = surface.divisions + 1;
  const points: (ProjectedVertex | null)[][] = [];
  for (let row = 0; row < size; row += 1) {
    const prow: (ProjectedVertex | null)[] = [];
    for (let col = 0; col < size; col += 1) {
      prow.push(toProjected(surface.vertices[row][col], camera, cx, cy, toPx));
    }
    points.push(prow);
  }

  const quads: RenderQuad[] = [];
  for (let row = 0; row < surface.divisions; row += 1) {
    for (let col = 0; col < surface.divisions; col += 1) {
      const a = surface.vertices[row][col];
      const b = surface.vertices[row][col + 1];
      const c = surface.vertices[row + 1][col + 1];
      const d = surface.vertices[row + 1][col];
      const pa = points[row][col];
      const pb = points[row][col + 1];
      const pc = points[row + 1][col + 1];
      const pd = points[row + 1][col];
      if (!a || !b || !c || !d || !pa || !pb || !pc || !pd) continue;
      quads.push({
        corners: [a, b, c, d],
        depth: (pa.depth + pb.depth + pc.depth + pd.depth) / 4,
      });
    }
  }
  quads.sort((p, q) => q.depth - p.depth);
  return { quads, points };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Interpolate between two RGB triples. */
function mixColor(
  near: [number, number, number],
  far: [number, number, number],
  t: number
): string {
  const clamped = Math.min(1, Math.max(0, t));
  return `rgb(${Math.round(lerp(near[0], far[0], clamped))},${Math.round(
    lerp(near[1], far[1], clamped)
  )},${Math.round(lerp(near[2], far[2], clamped))})`;
}

/**
 * Draw the sampled surface: painter's-algorithm wireframe with depth
 * shading. Near quads are drawn last with saturated color; far quads
 * fade, which reads as depth without any lighting model.
 */
export function drawSurface(
  ctx: CanvasRenderingContext2D,
  surface: SampledSurface,
  camera: OrbitCamera,
  options: SurfaceRenderOptions
): void {
  const { width, height, zoomScale } = options;
  const fillOpacity = options.fillOpacity ?? 0.55;
  const dark = options.dark ?? false;

  const { quads, points } = buildRenderQuads(surface, camera, { width, height, zoomScale });
  if (quads.length === 0) return;

  let minDepth = Infinity;
  let maxDepth = -Infinity;
  for (const quad of quads) {
    if (quad.depth < minDepth) minDepth = quad.depth;
    if (quad.depth > maxDepth) maxDepth = quad.depth;
  }
  const span = maxDepth - minDepth || 1;

  const nearLine: [number, number, number] = dark ? [147, 197, 253] : [29, 78, 216];
  const farLine: [number, number, number] = dark ? [55, 65, 81] : [191, 219, 254];
  const nearFill: [number, number, number] = dark ? [30, 58, 138] : [219, 234, 254];
  const farFill: [number, number, number] = dark ? [17, 24, 39] : [248, 250, 252];

  const cx = width / 2;
  const cy = height / 2;
  const toPx = (v: number): number => v * (width / 2 / zoomScale);
  const screenOf = (p: Vec3): { sx: number; sy: number } => {
    const projected = project(p, camera);
    return { sx: cx + toPx(projected.x), sy: cy - toPx(projected.y) };
  };

  ctx.lineWidth = 1;
  for (const quad of quads) {
    const t = (quad.depth - minDepth) / span; // 0 = nearest, 1 = farthest
    const [a, b, c, d] = quad.corners.map(screenOf);
    ctx.beginPath();
    ctx.moveTo(a.sx, a.sy);
    ctx.lineTo(b.sx, b.sy);
    ctx.lineTo(c.sx, c.sy);
    ctx.lineTo(d.sx, d.sy);
    ctx.closePath();
    ctx.fillStyle = mixColor(nearFill, farFill, t);
    ctx.globalAlpha = fillOpacity;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = mixColor(nearLine, farLine, t);
    ctx.stroke();
  }

  // Re-stroke the projected grid lines on top of the fills so the
  // wireframe stays crisp where neighboring fills overlap.
  ctx.lineWidth = 0.75;
  const size = surface.divisions + 1;
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const p = points[row][col];
      if (!p) continue;
      const right = col + 1 < size ? points[row][col + 1] : null;
      const down = row + 1 < size ? points[row + 1][col] : null;
      if (right) {
        ctx.strokeStyle = dark ? 'rgba(147,197,253,0.85)' : 'rgba(29,78,216,0.85)';
        ctx.beginPath();
        ctx.moveTo(p.sx, p.sy);
        ctx.lineTo(right.sx, right.sy);
        ctx.stroke();
      }
      if (down) {
        ctx.strokeStyle = dark ? 'rgba(147,197,253,0.55)' : 'rgba(29,78,216,0.55)';
        ctx.beginPath();
        ctx.moveTo(p.sx, p.sy);
        ctx.lineTo(down.sx, down.sy);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
}

export interface AxisRenderOptions {
  width: number;
  height: number;
  zoomScale: number;
  dark?: boolean;
}

/**
 * Draw labeled x/y/z axes on the canvas. Axes originate at the domain's
 * minimum corner and extend slightly past the maximum corner; labels sit
 * just past each tip.
 */
export function drawAxes(
  ctx: CanvasRenderingContext2D,
  surface: SampledSurface,
  camera: OrbitCamera,
  options: AxisRenderOptions
): void {
  const { width, height, zoomScale } = options;
  const dark = options.dark ?? false;
  const { xMin, xMax, yMin, yMax } = surface.domain;
  const zFloor = Number.isFinite(surface.zMin) ? Math.min(surface.zMin, 0) : 0;
  const zCeil = Number.isFinite(surface.zMax) ? Math.max(surface.zMax, 1) : 1;

  const origin: Vec3 = { x: xMin, y: yMin, z: zFloor };
  const pad = 0.6;
  const tips: Array<{ tip: Vec3; label: string }> = [
    { tip: { x: xMax + pad, y: yMin, z: zFloor }, label: 'x' },
    { tip: { x: xMin, y: yMax + pad, z: zFloor }, label: 'y' },
    { tip: { x: xMin, y: yMin, z: zCeil + pad }, label: 'z' },
  ];

  const cx = width / 2;
  const cy = height / 2;
  const toPx = (v: number): number => v * (width / 2 / zoomScale);
  const toScreen = (p: Vec3): { sx: number; sy: number } | null => {
    const projected = project(p, camera);
    if (projected.behind) return null;
    return { sx: cx + toPx(projected.x), sy: cy - toPx(projected.y) };
  };

  const o = toScreen(origin);
  if (!o) return;
  ctx.save();
  ctx.strokeStyle = dark ? '#94a3b8' : '#475569';
  ctx.fillStyle = dark ? '#e2e8f0' : '#334155';
  ctx.lineWidth = 1.25;
  ctx.font = '600 13px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const { tip, label } of tips) {
    const s = toScreen(tip);
    if (!s) continue;
    ctx.beginPath();
    ctx.moveTo(o.sx, o.sy);
    ctx.lineTo(s.sx, s.sy);
    ctx.stroke();
    ctx.fillText(label, s.sx, s.sy - 10);
  }
  ctx.restore();
}
