/**
 * Workstream A — orbit camera with perspective projection.
 *
 * Pure functions: given a camera and a 3D point, `project` returns 2D
 * screen coordinates. The camera orbits a target point: azimuth rotates
 * around the z-axis (world up), elevation raises or lowers the eye, and
 * distance sets how far the eye sits from the target. No DOM, no canvas —
 * easily unit-testable.
 */

import { add, cross, dot, normalize, sub, vec3, type Vec3 } from './vec3.js';

/**
 * Orbit camera state. Angles are in radians; elevation is clamped to
 * (−π/2, π/2) so the eye never passes through the poles and flips.
 */
export interface OrbitCamera {
  /** Horizontal orbit angle around the world z-axis, radians. */
  azimuth: number;
  /** Vertical angle of the eye above the xy-plane, radians. */
  elevation: number;
  /** Distance from the eye to the target point, in world units. */
  distance: number;
  /** The point the camera looks at. */
  target: Vec3;
  /** Vertical field of view, radians (default π/3 ≈ 60°). */
  fov: number;
}

/** A point projected onto the 2D screen. */
export interface ScreenPoint {
  /** Horizontal screen coordinate in the same units as the focal length. */
  x: number;
  /** Vertical screen coordinate (up is positive; negate for canvas y-down). */
  y: number;
  /** View-space depth along the viewing direction (larger = farther). */
  depth: number;
  /** True when the point sits behind the camera (depth ≤ 0). */
  behind: boolean;
}

const DEFAULT_FOV = Math.PI / 3;
const HALF_PI = Math.PI / 2;

/** Clamp elevation just inside the poles so the view matrix never flips. */
export function clampElevation(elevation: number): number {
  const limit = HALF_PI - 1e-6;
  return Math.min(limit, Math.max(-limit, elevation));
}

/** Create a camera with sensible defaults; override any field. */
export function createCamera(partial: Partial<OrbitCamera> = {}): OrbitCamera {
  return {
    azimuth: partial.azimuth ?? -Math.PI / 4,
    elevation: partial.elevation !== undefined ? clampElevation(partial.elevation) : Math.PI / 6,
    distance: partial.distance ?? 12,
    target: partial.target ?? vec3(0, 0, 0),
    fov: partial.fov ?? DEFAULT_FOV,
  };
}

/** Eye position derived from the orbit parameters. */
export function eyePosition(camera: OrbitCamera): Vec3 {
  const { azimuth, elevation, distance, target } = camera;
  const horizontal = Math.cos(elevation) * distance;
  return add(target, {
    x: horizontal * Math.cos(azimuth),
    y: horizontal * Math.sin(azimuth),
    z: Math.sin(elevation) * distance,
  });
}

/**
 * Project a world point to screen space with perspective projection.
 * Screen x/y are in focal-length units centered on the target: multiply
 * by (canvasSize / (2 * focal)) to map into pixels.
 */
export function project(p: Vec3, camera: OrbitCamera): ScreenPoint {
  const eye = eyePosition(camera);
  const forward = normalize(sub(camera.target, eye));
  const worldUp = vec3(0, 0, 1);
  // Guard the polar case: when looking straight down the z-axis,
  // forward × worldUp degenerates, so fall back to the x-axis.
  const right =
    Math.abs(dot(forward, worldUp)) > 1 - 1e-9 ? vec3(1, 0, 0) : normalize(cross(forward, worldUp));
  const up = cross(right, forward);

  const relative = sub(p, eye);
  const viewX = dot(relative, right);
  const viewY = dot(relative, up);
  const viewZ = dot(relative, forward);

  const focal = 1 / Math.tan(camera.fov / 2);
  if (viewZ <= 0) {
    return { x: 0, y: 0, depth: viewZ, behind: true };
  }
  return {
    x: (focal * viewX) / viewZ,
    y: (focal * viewY) / viewZ,
    depth: viewZ,
    behind: false,
  };
}

/** Rotate the camera by delta angles (drag input); elevation stays clamped. */
export function rotateCamera(
  camera: OrbitCamera,
  deltaAzimuth: number,
  deltaElevation: number
): OrbitCamera {
  return {
    ...camera,
    azimuth: camera.azimuth + deltaAzimuth,
    elevation: clampElevation(camera.elevation + deltaElevation),
  };
}

/**
 * Zoom the camera by a multiplicative factor (> 1 zooms out). Distance
 * is clamped to a sane range so the surface can never be lost.
 */
export function zoomCamera(camera: OrbitCamera, factor: number): OrbitCamera {
  const distance = Math.min(100, Math.max(2, camera.distance * factor));
  return { ...camera, distance };
}
