/**
 * Single Page Apps for GitHub Pages
 * Handles redirect from query string to correct URL for SPA routing
 * @see https://github.com/rafgraph/spa-github-pages
 */
export function initSpaRedirect(): void {
	const { search, pathname, hash } = window.location;
	if (search[1] === '/') {
		const decoded = search
			.slice(1)
			.split('&')
			.map((s) => s.replace(/~and~/g, '&'))
			.join('?');
		window.history.replaceState(
			null,
			'',
			pathname.slice(0, -1) + decoded + hash,
		);
	}
}
