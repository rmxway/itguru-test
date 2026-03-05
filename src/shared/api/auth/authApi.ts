import { API_BASE_URL, API_ENDPOINTS } from '../config';
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
): Promise<LoginResponse> {
	const body: LoginRequest = { username, password };

	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.login}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const message =
			AUTH_ERROR_MESSAGES[
				response.status as keyof typeof AUTH_ERROR_MESSAGES
			] ?? 'Произошла ошибка при авторизации';

		try {
			const errorData = (await response.json()) as { message?: string };
			throw new AuthApiError(
				errorData.message ?? message,
				response.status,
			);
		} catch (err) {
			if (err instanceof AuthApiError) {
				throw err;
			}
			throw new AuthApiError(message, response.status);
		}
	}

	return response.json() as Promise<LoginResponse>;
}
