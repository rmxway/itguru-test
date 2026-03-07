export class NetworkError extends Error {
	constructor(message = 'Нет подключения к сети') {
		super(message);
		this.name = 'NetworkError';
	}
}

export class TimeoutError extends Error {
	constructor(message = 'Превышено время ожидания') {
		super(message);
		this.name = 'TimeoutError';
	}
}

export class ValidationError extends Error {
	constructor(message = 'Ошибка валидации данных') {
		super(message);
		this.name = 'ValidationError';
	}
}

export class UnauthorizedError extends Error {
	readonly status = 401;

	constructor(message = 'Требуется авторизация') {
		super(message);
		this.name = 'UnauthorizedError';
	}
}

export class ServerError extends Error {
	readonly status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = 'ServerError';
		this.status = status;
	}
}
