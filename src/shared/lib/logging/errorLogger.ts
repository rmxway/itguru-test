import { CanceledError, isAxiosError } from 'axios';

/**
 * Централизованное логирование ошибок.
 * TODO: интеграция с Sentry, LogRocket или аналогом.
 */
export interface ErrorLogContext {
	user?: string;
	url?: string;
	timestamp?: string;
	[key: string]: unknown;
}

export function logError(error: unknown, context: ErrorLogContext = {}): void {
	const timestamp = new Date().toISOString();
	const message = error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : undefined;

	const logEntry = {
		message,
		stack,
		timestamp,
		...context,
	};

	if (import.meta.env.PROD) {
		// В продакшене отправить в систему мониторинга
		// Sentry.captureException(error, { extra: context });
		console.error('[Error]', logEntry);
	} else {
		console.error('[Error]', logEntry);
	}
}

function isCanceledRequest(reason: unknown): boolean {
	if (reason instanceof CanceledError) return true;
	if (isAxiosError(reason) && reason.code === 'ERR_CANCELED') return true;
	return false;
}

export function setupErrorBoundary(): void {
	window.addEventListener('error', (event) => {
		if (event.error) {
			logError(event.error, {
				url: window.location.href,
				message: event.message,
			});
		}
	});

	window.addEventListener('unhandledrejection', (event) => {
		if (isCanceledRequest(event.reason)) {
			return;
		}
		logError(event.reason, {
			url: window.location.href,
			type: 'unhandledrejection',
		});
	});
}
