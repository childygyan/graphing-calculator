/**
 * Workstream A tests — vec3 math, orbit camera projection, surface
 * sampling, and two-variable expression compilation.
 */

import { describe, expect, it } from 'vitest';
import { add, cross, dot, length, normalize, scale, sub, vec3 } from '../vec3.js';
import {
  clampElevation,
  createCamera,
  eyePosition,
  project,
  rotateCamera,
  zoomCamera,
} from '../camera.js';
import {
  buildRenderQuads,
  compileSurface,
  fitSurfaceZ,
  sampleSurface,
  SurfaceCompileError,
} from '../index.js';

const TAU = Math.PI * 2;

describe('vec3', () => {
  it('adds and subtracts component-wise', () => {
    expect(add(vec3(1, 2, 3), vec3(4, 5, 6))).toEqual(vec3(5, 7, 9));
    expect(sub(vec3(4, 5, 6), vec3(1, 2, 3))).toEqual(vec3(3, 3, 3));
  });

  it('scales every component', () => {
    expect(scale(vec3(1, -2, 3), 2)).toEqual(vec3(2, -4, 6));
  });

  it('computes the dot product', () => {
    expect(dot(vec3(1, 0, 0), vec3(0, 1, 0))).toBe(0);
    expect(dot(vec3(1, 2, 3), vec3(4, 5, 6))).toBe(32);
  });

  it('computes the cross product with the right-hand rule', () => {
    expect(cross(vec3(1, 0, 0), vec3(0, 1, 0))).toEqual(vec3(0, 0, 1));
    expect(cross(vec3(0, 1, 0), vec3(1, 0, 0))).toEqual(vec3(0, 0, -1));
  });

  it('normalizes to unit length', () => {
    const n = normalize(vec3(0, 3, 4));
    expect(length(n)).toBeCloseTo(1, 12);
    expect(n.x).toBeCloseTo(0, 12);
    expect(n.y).toBeCloseTo(0.6, 12);
    expect(n.z).toBeCloseTo(0.8, 12);
  });

  it('normalizes the zero vector to itself instead of NaN', () => {
    expect(normalize(vec3(0, 0, 0))).toEqual(vec3(0, 0, 0));
  });
});

describe('orbit camera', () => {
  it('places the eye at (distance, 0, 0) for zero angles', () => {
    const eye = eyePosition(createCamera({ azimuth: 0, elevation: 0, distance: 10 }));
    expect(eye.x).toBeCloseTo(10, 12);
    expect(eye.y).toBeCloseTo(0, 12);
    expect(eye.z).toBeCloseTo(0, 12);
  });

  it('rotates the eye 90° around the z-axis: +x orbit → +y orbit', () => {
    // Eye position for azimuth π/2, elevation 0: (cos π/2, sin π/2, 0) * d = (0, d, 0).
    const eye = eyePosition(createCamera({ azimuth: Math.PI / 2, elevation: 0, distance: 10 }));
    expect(eye.x).toBeCloseTo(0, 12);
    expect(eye.y).toBeCloseTo(10, 12);
    expect(eye.z).toBeCloseTo(0, 12);
  });

  it('lifts the eye with elevation: π/2 elevation looks straight down', () => {
    const eye = eyePosition(
      createCamera({ azimuth: 0, elevation: Math.PI / 2 - 1e-3, distance: 10 })
    );
    expect(eye.z).toBeCloseTo(10, 2);
    expect(Math.hypot(eye.x, eye.y)).toBeLessThan(0.01);
  });

  it('clamps elevation inside the poles', () => {
    expect(clampElevation(Math.PI)).toBeLessThan(Math.PI / 2);
    expect(clampElevation(-Math.PI)).toBeGreaterThan(-Math.PI / 2);
    const cam = createCamera({ elevation: 10 });
    expect(cam.elevation).toBeLessThan(Math.PI / 2);
  });

  it('rotates by deltas and keeps elevation clamped', () => {
    const cam = rotateCamera(createCamera({ azimuth: 0, elevation: 0 }), Math.PI, 100);
    expect(cam.azimuth).toBeCloseTo(Math.PI, 12);
    expect(cam.elevation).toBeLessThan(Math.PI / 2);
  });

  it('wraps azimuth consistently: +TAU is a full turn', () => {
    const a = eyePosition(createCamera({ azimuth: 0.7, elevation: 0.2, distance: 8 }));
    const b = eyePosition(createCamera({ azimuth: 0.7 + TAU, elevation: 0.2, distance: 8 }));
    expect(b.x).toBeCloseTo(a.x, 10);
    expect(b.y).toBeCloseTo(a.y, 10);
    expect(b.z).toBeCloseTo(a.z, 10);
  });

  it('zooms multiplicatively and clamps distance', () => {
    const cam = zoomCamera(createCamera({ distance: 10 }), 0.5);
    expect(cam.distance).toBe(5);
    expect(zoomCamera(cam, 1000).distance).toBe(100);
    expect(zoomCamera(cam, 0.0001).distance).toBe(2);
  });
});

describe('perspective projection', () => {
  it('projects the target to the screen center with zero depth offset', () => {
    const cam = createCamera({ target: vec3(1, 2, 3) });
    const p = project(vec3(1, 2, 3), cam);
    expect(p.x).toBeCloseTo(0, 10);
    expect(p.y).toBeCloseTo(0, 10);
    expect(p.behind).toBe(false);
    expect(p.depth).toBeGreaterThan(0);
  });

  it('shrinks distant points: nearer points project larger', () => {
    const cam = createCamera({ azimuth: 0, elevation: 0, distance: 20 });
    const near = project(vec3(10, 2, 0), cam);
    const far = project(vec3(0, 2, 0), cam);
    expect(near.behind).toBe(false);
    expect(far.behind).toBe(false);
    expect(near.depth).toBeLessThan(far.depth);
    expect(Math.abs(near.x)).toBeGreaterThan(Math.abs(far.x));
  });

  it('flags points behind the camera', () => {
    const cam = createCamera({ azimuth: 0, elevation: 0, distance: 10 });
    // Eye at (10,0,0) looking at origin: (11,0,0) is behind the eye.
    const p = project(vec3(11, 0, 0), cam);
    expect(p.behind).toBe(true);
    expect(p.depth).toBeLessThanOrEqual(0);
  });

  it('mirrors points across the target horizontally', () => {
    const cam = createCamera({ azimuth: 0, elevation: 0, distance: 20 });
    const left = project(vec3(0, 2, 0), cam);
    const right = project(vec3(0, -2, 0), cam);
    expect(left.x).toBeCloseTo(-right.x, 10);
    expect(left.y).toBeCloseTo(right.y, 10);
  });
});

describe('sampleSurface', () => {
  const domain = { xMin: -2, xMax: 2, yMin: -3, yMax: 3 };

  it('builds a (divisions+1)² grid with corner values', () => {
    const s = sampleSurface((x, y) => x + y, domain, 16);
    expect(s.divisions).toBe(16);
    expect(s.vertices).toHaveLength(17);
    expect(s.vertices[0]).toHaveLength(17);
    // Corner (row 0, col 0) = (xMin, yMin) = (-2, -3).
    expect(s.vertices[0][0]).toEqual({ x: -2, y: -3, z: -5 });
    expect(s.zMin).toBe(-5);
    expect(s.zMax).toBe(5);
    expect(s.finiteCount).toBe(17 * 17);
  });

  it('creates honest gaps where the function is NaN', () => {
    const s = sampleSurface((x, y) => (x === 0 ? NaN : x + y), domain, 16);
    // Grid x values: -2 + (4 * col)/16; col 8 hits x = 0 exactly.
    expect(s.vertices[0][8]).toBeNull();
    expect(s.vertices[5][8]).toBeNull();
    expect(s.vertices[5][7]).not.toBeNull();
    expect(s.finiteCount).toBe(17 * 17 - 17);
  });

  it('treats Infinity as a gap, not a streak', () => {
    const s = sampleSurface(() => Infinity, domain, 16);
    expect(s.finiteCount).toBe(0);
    expect(s.zMin).toBeNaN();
    expect(s.zMax).toBeNaN();
  });

  it('clamps divisions into the supported range', () => {
    expect(sampleSurface((x, y) => x * y, domain, 200).divisions).toBe(64);
    expect(sampleSurface((x, y) => x * y, domain, 2).divisions).toBe(16);
  });
});

describe('compileSurface', () => {
  it('evaluates f(x,y) = x + y correctly', () => {
    const { fn } = compileSurface('x + y');
    expect(fn(2, 3)).toBe(5);
    expect(fn(-1.5, 0.25)).toBeCloseTo(-1.25, 12);
  });

  it('compiles the paraboloid preset: x^2 + y^2', () => {
    const { fn } = compileSurface('x^2 + y^2');
    expect(fn(2, 3)).toBe(13);
    expect(fn(0, 0)).toBe(0);
  });

  it('supports functions and constants: sin(sqrt(x^2+y^2))', () => {
    const { fn } = compileSurface('sin(sqrt(x^2+y^2))');
    expect(fn(0, 0)).toBe(0);
    expect(fn(3, 4)).toBeCloseTo(Math.sin(5), 12);
  });

  it('binds x and y case-insensitively', () => {
    const { fn } = compileSurface('X + Y');
    expect(fn(1, 2)).toBe(3);
  });

  it('rejects unknown variables with a SurfaceCompileError, never a throw of raw NaN', () => {
    expect(() => compileSurface('x + z')).toThrow(SurfaceCompileError);
    expect(() => compileSurface('x + z')).toThrow(/Unknown variable/);
  });

  it('turns parse errors into SurfaceCompileError', () => {
    expect(() => compileSurface('x +* y')).toThrow(SurfaceCompileError);
  });

  it('reports domain violations as NaN, not exceptions', () => {
    const { fn } = compileSurface('sqrt(x)');
    expect(fn(-1, 0)).toBeNaN();
    expect(fn(4, 0)).toBe(2);
  });
});

describe('fitSurfaceZ', () => {
  const domain = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };

  it('leaves small spans untouched (zScale 1, same vertices)', () => {
    const small = { xMin: -2, xMax: 2, yMin: -2, yMax: 2 };
    const raw = sampleSurface((x, y) => x + y, small, 16);
    expect(raw.zMax - raw.zMin).toBeLessThan(11);
    const { surface, zScale } = fitSurfaceZ(raw);
    expect(zScale).toBe(1);
    expect(surface.vertices).toBe(raw.vertices);
  });

  it('shrinks tall spans into the display box, keeping gaps', () => {
    const raw = sampleSurface((x, y) => (x === 0 ? NaN : x * x + y * y), domain, 16);
    const { surface, zScale } = fitSurfaceZ(raw, 11);
    expect(zScale).toBeCloseTo(11 / (raw.zMax - raw.zMin), 12);
    expect(zScale).toBeLessThan(1);
    expect(surface.zMax - surface.zMin).toBeCloseTo(11, 10);
    // NaN gap column survives the fit.
    expect(surface.vertices[3][8]).toBeNull();
    // Shape is preserved: the lowest finite vertex is still at the
    // bottom of the display box (col 8 is the x = 0 gap column, so the
    // minimum lives at the adjacent columns).
    const nearCenter = surface.vertices[8][7];
    expect(nearCenter).not.toBeNull();
    expect(nearCenter?.z).toBeCloseTo(surface.zMin ?? 0, 10);
  });

  it('passes through a surface with no finite values', () => {
    const raw = sampleSurface(() => NaN, domain, 16);
    const { zScale } = fitSurfaceZ(raw);
    expect(zScale).toBe(1);
  });
});

describe('buildRenderQuads', () => {
  it('emits divisions² quads for a fully finite grid, sorted back-to-front', () => {
    const surface = sampleSurface(
      (x, y) => x * x + y * y,
      { xMin: -1, xMax: 1, yMin: -1, yMax: 1 },
      16
    );
    const camera = createCamera();
    const { quads } = buildRenderQuads(surface, camera, {
      width: 600,
      height: 400,
      zoomScale: 2,
    });
    expect(quads).toHaveLength(16 * 16);
    for (let i = 1; i < quads.length; i += 1) {
      expect(quads[i - 1].depth).toBeGreaterThanOrEqual(quads[i].depth);
    }
  });

  it('skips quads touching NaN gaps', () => {
    const surface = sampleSurface(
      (x, y) => (x < 0 ? NaN : x + y),
      { xMin: -1, xMax: 1, yMin: -1, yMax: 1 },
      16
    );
    const { quads } = buildRenderQuads(surface, createCamera(), {
      width: 600,
      height: 400,
      zoomScale: 2,
    });
    expect(quads.length).toBeLessThan(16 * 16);
    expect(quads.length).toBeGreaterThan(0);
  });

  it('drops vertices that project past the off-screen guard', () => {
    // Camera very close to the surface: some vertices land almost in the
    // camera plane and would project to extreme coordinates. The guard
    // (10 focal-length units) must drop them instead of emitting them.
    const surface = sampleSurface(
      (x, y) => x * x + y * y,
      { xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
      16
    );
    const camera = createCamera({ distance: 2.5, elevation: 0.05 });
    const width = 600;
    const height = 400;
    const zoomScale = 0.26;
    const { points } = buildRenderQuads(surface, camera, { width, height, zoomScale });
    const toFocal = (px: number): number => (px - width / 2) / (width / 2 / zoomScale);
    let dropped = 0;
    for (const row of points) {
      for (const p of row) {
        if (!p) {
          dropped += 1;
          continue;
        }
        expect(Math.abs(toFocal(p.sx))).toBeLessThanOrEqual(10);
      }
    }
    // x²+y² is finite everywhere on this grid, so every dropped vertex
    // was dropped by the projection guard, not by a NaN gap.
    expect(dropped).toBeGreaterThan(0);
  });
});
