/**
 * Workstream A — minimal 3D vector math.
 *
 * Pure TypeScript, no dependencies. Immutable value semantics: every
 * operation returns a fresh Vec3 so camera and surface code stays free
 * of accidental mutation.
 */

/** A point or direction in 3D space. */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Construct a Vec3 from components. */
export function vec3(x: number, y: number, z: number): Vec3 {
  return { x, y, z };
}

/** Component-wise addition. */
export function add(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

/** Component-wise subtraction (a − b). */
export function sub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

/** Multiply every component by a scalar. */
export function scale(v: Vec3, s: number): Vec3 {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

/** Dot product. */
export function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

/** Cross product (a × b). */
export function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

/** Euclidean length. */
export function length(v: Vec3): number {
  return Math.sqrt(dot(v, v));
}

/**
 * Unit vector in the same direction. The zero vector normalizes to the
 * zero vector rather than NaN, so degenerate inputs fail silently but
 * honestly downstream.
 */
export function normalize(v: Vec3): Vec3 {
  const len = length(v);
  return len === 0 ? vec3(0, 0, 0) : scale(v, 1 / len);
}
