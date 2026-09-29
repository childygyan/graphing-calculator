/**
 * DOM interaction controller for the graph canvas: wheel zoom, pointer-drag
 * pan, two-finger pinch zoom, and mouse hover. No React — the owning
 * component wires the callbacks (onZoom/onPan) to viewport updates and
 * re-renders. Wheel gestures are discrete onZoom calls; pointer gestures
 * bracket with onInteractionStart/onInteractionEnd.
 */

import type { ScreenPoint, WorldPoint } from './types.js';
import type { ViewportTransform } from './coordinate-system.js';

export interface GraphInteractionCallbacks {
  /** factor < 1 zooms in, factor > 1 zooms out; anchor is in CSS px. */
  onZoom(factor: number, anchorScreen: ScreenPoint): void;
  /** CSS pixel deltas (positive dx pans the view content right). */
  onPan(deltaScreenX: number, deltaScreenY: number): void;
  /** World position under the cursor, or null when it leaves the canvas. */
  onHover(world: WorldPoint | null): void;
  onInteractionStart(): void;
  onInteractionEnd(): void;
}

export interface GraphInteractionOptions {
  wheelSensitivity?: number;
}

const DEFAULT_WHEEL_SENSITIVITY = 0.0016;
const MIN_GESTURE_FACTOR = 0.5;
const MAX_GESTURE_FACTOR = 2;
/** Wheel deltaMode 1 (lines) -> px per line. */
const LINE_HEIGHT_PX = 16;

function clampFactor(factor: number): number {
  if (!Number.isFinite(factor)) return 1;
  return Math.min(MAX_GESTURE_FACTOR, Math.max(MIN_GESTURE_FACTOR, factor));
}

function distance(a: ScreenPoint, b: ScreenPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function midpoint(a: ScreenPoint, b: ScreenPoint): ScreenPoint {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export class GraphInteractionController {
  private readonly canvas: HTMLCanvasElement;
  private readonly getTransform: () => ViewportTransform;
  private readonly callbacks: GraphInteractionCallbacks;
  private readonly wheelSensitivity: number;
  private readonly pointers = new Map<number, ScreenPoint>();
  private dragging = false;
  private lastPos: ScreenPoint | null = null;
  private attached = false;

  constructor(
    canvas: HTMLCanvasElement,
    getTransform: () => ViewportTransform,
    callbacks: GraphInteractionCallbacks,
    options?: GraphInteractionOptions
  ) {
    this.canvas = canvas;
    this.getTransform = getTransform;
    this.callbacks = callbacks;
    const sensitivity = options?.wheelSensitivity;
    this.wheelSensitivity =
      typeof sensitivity === 'number' && Number.isFinite(sensitivity) && sensitivity > 0
        ? sensitivity
        : DEFAULT_WHEEL_SENSITIVITY;
  }

  attach(): void {
    if (this.attached) return;
    this.attached = true;
    this.canvas.addEventListener('wheel', this.handleWheel, { passive: false });
    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
    this.canvas.addEventListener('pointermove', this.handlePointerMove);
    this.canvas.addEventListener('pointerup', this.handlePointerUp);
    this.canvas.addEventListener('pointercancel', this.handlePointerUp);
    this.canvas.addEventListener('pointerleave', this.handlePointerLeave);
  }

  /** Remove all listeners and reset gesture state. */
  detach(): void {
    if (!this.attached) return;
    this.attached = false;
    this.canvas.removeEventListener('wheel', this.handleWheel);
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    this.canvas.removeEventListener('pointermove', this.handlePointerMove);
    this.canvas.removeEventListener('pointerup', this.handlePointerUp);
    this.canvas.removeEventListener('pointercancel', this.handlePointerUp);
    this.canvas.removeEventListener('pointerleave', this.handlePointerLeave);
    this.pointers.clear();
    this.dragging = false;
    this.lastPos = null;
  }

  private readonly handleWheel = (event: WheelEvent): void => {
    // Non-passive so we can suppress page scroll over the canvas.
    event.preventDefault();
    const { deltaY, deltaMode } = event;
    const pageHeight =
      typeof window !== 'undefined' && Number.isFinite(window.innerHeight)
        ? window.innerHeight
        : 800;
    const normalizedDelta =
      deltaY * (deltaMode === 1 ? LINE_HEIGHT_PX : deltaMode === 2 ? pageHeight : 1);
    if (!Number.isFinite(normalizedDelta) || normalizedDelta === 0) return;
    // Scroll down (positive deltaY) -> factor > 1 -> zoom out.
    const factor = clampFactor(Math.exp(normalizedDelta * this.wheelSensitivity));
    this.callbacks.onZoom(factor, this.toLocalPoint(event));
  };

  private readonly handlePointerDown = (event: PointerEvent): void => {
    const pos = this.toLocalPoint(event);
    try {
      this.canvas.setPointerCapture(event.pointerId);
    } catch {
      // setPointerCapture can throw for synthetic events; capture is best-effort.
    }
    const wasEmpty = this.pointers.size === 0;
    this.pointers.set(event.pointerId, pos);
    if (wasEmpty) this.callbacks.onInteractionStart();
    if (this.pointers.size === 1) {
      this.dragging = true;
      this.lastPos = pos;
    } else {
      // Multi-touch: dragging hands over to the pinch handler.
      this.dragging = false;
      this.lastPos = null;
    }
  };

  private readonly handlePointerMove = (event: PointerEvent): void => {
    const pos = this.toLocalPoint(event);

    if (this.pointers.size === 2 && this.pointers.has(event.pointerId)) {
      const before = [...this.pointers.values()];
      this.pointers.set(event.pointerId, pos);
      const after = [...this.pointers.values()];
      const oldDist = distance(before[0], before[1]);
      const newDist = distance(after[0], after[1]);
      const midBefore = midpoint(before[0], before[1]);
      const midAfter = midpoint(after[0], after[1]);
      // Pan follows the midpoint; pinch scales around it.
      const dx = midAfter.x - midBefore.x;
      const dy = midAfter.y - midBefore.y;
      if (dx !== 0 || dy !== 0) this.callbacks.onPan(dx, dy);
      // A zero old distance means the fingers just landed together — skip.
      if (oldDist > 0 && newDist > 0) {
        this.callbacks.onZoom(clampFactor(oldDist / newDist), midAfter);
      }
      return;
    }

    if (!this.pointers.has(event.pointerId)) {
      // Not part of an active gesture: mouse hover only, no buttons held.
      if (event.pointerType === 'mouse' && event.buttons === 0) {
        this.callbacks.onHover(this.getTransform().screenToWorld(pos));
      }
      return;
    }

    this.pointers.set(event.pointerId, pos);
    if (this.pointers.size === 1 && this.dragging && (event.buttons & 1) === 1 && this.lastPos) {
      const dx = pos.x - this.lastPos.x;
      const dy = pos.y - this.lastPos.y;
      this.lastPos = pos;
      if (dx !== 0 || dy !== 0) this.callbacks.onPan(dx, dy);
    } else if (event.pointerType === 'mouse' && event.buttons === 0) {
      this.callbacks.onHover(this.getTransform().screenToWorld(pos));
    }
  };

  private readonly handlePointerUp = (event: PointerEvent): void => {
    this.pointers.delete(event.pointerId);
    try {
      if (this.canvas.hasPointerCapture(event.pointerId)) {
        this.canvas.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Release is best-effort; the pointer is gone either way.
    }
    if (this.pointers.size === 0) {
      this.dragging = false;
      this.lastPos = null;
      this.callbacks.onInteractionEnd();
    } else if (this.pointers.size === 1) {
      // Back to a single finger: resume drag-panning from its position.
      this.dragging = true;
      const [remaining] = this.pointers.values();
      this.lastPos = remaining ? { ...remaining } : null;
    }
  };

  private readonly handlePointerLeave = (event: PointerEvent): void => {
    if (!this.dragging && event.pointerType === 'mouse') {
      this.callbacks.onHover(null);
    }
  };

  private toLocalPoint(event: PointerEvent | WheelEvent): ScreenPoint {
    const rect = this.canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
}
