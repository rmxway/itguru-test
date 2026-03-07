import { getAccessToken } from '@shared/lib/storage';

const CSRF_META_NAME = 'csrf-token';

export function getCSRFToken(): string | null {
	const meta = document.querySelector(`meta[name="${CSRF_META_NAME}"]`);
	return meta?.getAttribute('content') ?? null;
}

export function getAuthHeaders(): Record<string, string> {
	const headers: Record<string, string> = {};
	const csrfToken = getCSRFToken();
	if (csrfToken) {
		headers['X-CSRF-Token'] = csrfToken;
	}
	const accessToken = getAccessToken();
	if (accessToken) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}
	return headers;
}
