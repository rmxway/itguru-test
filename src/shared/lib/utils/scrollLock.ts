export function lockScroll(): void {
	const scrollbarWidth =
		window.innerWidth - document.documentElement.clientWidth;
	document.body.style.overflow = 'hidden';
	if (scrollbarWidth > 0) {
		document.body.style.paddingRight = `${scrollbarWidth}px`;
	}
}

export function unlockScroll(): void {
	document.body.style.overflow = '';
	document.body.style.paddingRight = '';
}
