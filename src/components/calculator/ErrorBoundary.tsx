/**
 * ErrorBoundary — React class component that catches render errors in a
 * subtree and shows a friendly fallback instead of unmounting the page.
 * No `any`: errors are typed with the standard React signatures.
 */

import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Button } from '../ui/index.js';
import { AlertTriangleIcon } from '../ui/icons.js';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught a render error:', error, errorInfo);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900"
        >
          <AlertTriangleIcon className="h-8 w-8 text-amber-500" />
          <p className="font-medium text-slate-900 dark:text-slate-100">
            {this.props.fallbackTitle ?? 'Something went wrong'}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            An unexpected error interrupted this part of the page. Your other data is unaffected.
          </p>
          <Button size="sm" variant="secondary" onClick={this.handleRetry}>
            Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
