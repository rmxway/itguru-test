/** @deprecated Используйте axios и {@link getErrorMessage}; класс оставлен для обратной совместимости импортов. */
export class HttpError extends Error {
	readonly status?: number;

	constructor(message: string, status?: number) {
		super(message);
		this.name = 'HttpError';
		this.status = status;
	}
}
