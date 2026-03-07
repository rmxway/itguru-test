const CSRF_META_NAME = 'csrf-token';

export function getCSRFToken(): string | null {
	const meta = document.querySelector(`meta[name="${CSRF_META_NAME}"]`);
	return meta?.getAttribute('content') ?? null;
}

export function getAuthHeaders(): Record<string, string> {
	const headers: Record<string, string> = {};
	const token = getCSRFToken();
	if (token) {
		headers['X-CSRF-Token'] = token;
	}
	return headers;
}
