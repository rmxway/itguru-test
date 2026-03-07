import { Component, type ReactNode } from 'react';
import { logError } from '@shared/lib/logging/errorLogger';
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		logError(error, {
			componentStack: errorInfo.componentStack,
			url:
				typeof window !== 'undefined'
					? window.location.href
					: undefined,
		});
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return this.props.fallback ?? <ErrorBoundaryFallback />;
		}

		return this.props.children;
	}
}
