/**
 * Обработчик нарушений Content Security Policy.
 * Можно интегрировать с сервисом мониторинга (Sentry, LogRocket).
 */
export function reportCSPViolation(event: SecurityPolicyViolationEvent): void {
	const report = {
		documentURI: event.documentURI,
		violatedDirective: event.violatedDirective,
		blockedURI: event.blockedURI,
		sourceFile: event.sourceFile,
		lineNumber: event.lineNumber,
		columnNumber: event.columnNumber,
	};

	// В продакшене можно отправить в систему логирования
	if (import.meta.env.PROD) {
		// TODO: интеграция с Sentry/LogRocket
		console.error('[CSP Violation]', report);
	}
}

export function setupCSPReporter(): void {
	document.addEventListener('securitypolicyviolation', reportCSPViolation);
}
