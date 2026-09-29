/**
 * GraphErrorBoundary — error boundary scoped to the interactive graph.
 * Mirrors the calculator ErrorBoundary pattern: a render/initialization
 * failure in the canvas stack shows a friendly fallback with a retry that
 * remounts the graph, without touching expressions or settings.
 */

import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Button } from '../ui/index.js';
import { AlertTriangleIcon } from '../ui/icons.js';

export interface GraphErrorBoundaryProps {
  children: ReactNode;
  /** Translated strings; English literals are the defaults. */
  strings?: {
    title: string;
    message: string;
    retry: string;
  };
}

interface GraphErrorBoundaryState {
  hasError: boolean;
}

export class GraphErrorBoundary extends Component<
  GraphErrorBoundaryProps,
  GraphErrorBoundaryState
> {
  state: GraphErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): GraphErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('GraphErrorBoundary caught a graph error:', error, errorInfo);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    const t = this.props.strings;
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center"
        >
          <AlertTriangleIcon className="h-8 w-8 text-amber-500" />
          <p className="font-medium text-slate-900 dark:text-slate-100">
            {t?.title ?? 'The interactive graph ran into a problem'}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t?.message ?? 'Your expressions and settings are unaffected.'}
          </p>
          <Button size="sm" variant="secondary" onClick={this.handleRetry}>
            {t?.retry ?? 'Reload graph'}
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default GraphErrorBoundary;
