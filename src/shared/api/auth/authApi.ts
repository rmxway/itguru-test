import { isAxiosError } from 'axios';
import { API_ENDPOINTS } from '../config';
import { publicApi } from '../httpClient';
import type { LoginRequest, LoginResponse } from '@shared/types';

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

	try {
		const { data } = await publicApi.post<LoginResponse>(
			API_ENDPOINTS.auth.login,
			body,
			{
				headers: { 'Content-Type': 'application/json' },
				signal,
			},
		);
		return data;
	} catch (e) {
		if (isAxiosError(e) && e.response) {
			const status = e.response.status;
			const fallback =
				AUTH_ERROR_MESSAGES[
					status as keyof typeof AUTH_ERROR_MESSAGES
				] ?? 'Произошла ошибка при авторизации';
			let message = fallback;
			const payload = e.response.data;
			if (
				payload &&
				typeof payload === 'object' &&
				'message' in payload
			) {
				const m = (payload as { message: unknown }).message;
				if (typeof m === 'string' && m.trim()) message = m;
			}
			throw new AuthApiError(message, status);
		}
		throw e;
	}
}
