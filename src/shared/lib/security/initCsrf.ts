const CSRF_META_NAME = 'csrf-token';

export function initCsrfToken(): void {
	const meta = document.querySelector(`meta[name="${CSRF_META_NAME}"]`);
	if (meta) {
		const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('');
		meta.setAttribute('content', token);
	}
}
