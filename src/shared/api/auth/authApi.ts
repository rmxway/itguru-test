import { API_BASE_URL, API_ENDPOINTS } from '../config';
import { getAuthHeaders } from '@shared/lib/security/csrf';
import type { LoginRequest, LoginResponse } from './types';

const AUTH_ERROR_MESSAGES: Record<number, string> = {
	400: 'Неверный формат данных',
	401: 'Неверный логин или пароль',
	500: 'Ошибка сервера, попробуйте позже',
};

export class AuthApiError extends Error {
	readonly status?: number;

	constructor(message: string, status?: number) {
		super(message);
		this.name = 'AuthApiError';
		this.status = status;
	}
}

export async function login(
	username: string,
	password: string,
	signal?: AbortSignal,
): Promise<LoginResponse> {
	const body: LoginRequest = { username, password, expiresInMins: 30 };

	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.login}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify(body),
		credentials: 'omit',
		signal,
	});

	if (!response.ok) {
		const message =
			AUTH_ERROR_MESSAGES[
				response.status as keyof typeof AUTH_ERROR_MESSAGES
			] ?? 'Произошла ошибка при авторизации';

		let errorMessage = message;
		try {
			const errorData = (await response.json()) as { message?: string };
			if (typeof errorData?.message === 'string') {
				errorMessage = errorData.message;
			}
		} catch {
			// Невалидный JSON в ответе - используем дефолтное сообщение
		}
		throw new AuthApiError(errorMessage, response.status);
	}

	try {
		return (await response.json()) as LoginResponse;
	} catch {
		throw new AuthApiError('Некорректный ответ сервера', 0);
	}
}
