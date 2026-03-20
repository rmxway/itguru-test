import { isAxiosError, CanceledError } from 'axios';
import { LOGIN_TIMEOUT_MS } from '@shared/constants';
import { AuthApiError } from '@shared/api/auth/authApi';
import { HttpError } from '@shared/api/errors';

const GENERIC_MESSAGE = 'Произошла ошибка';
const NETWORK_MESSAGE = 'Нет подключения к сети';
const TIMEOUT_LOGIN_MESSAGE = `Превышено время ожидания (${LOGIN_TIMEOUT_MS / 1000} секунд)`;

function axiosUserMessage(
	code: string | undefined,
	hasResponse: boolean,
): string {
	if (code === 'ERR_CANCELED') {
		return '';
	}
	return hasResponse ? GENERIC_MESSAGE : NETWORK_MESSAGE;
}

export function getErrorMessage(error: unknown): string {
	if (error == null) return GENERIC_MESSAGE;
	if (typeof error === 'string') return error;
	if (error instanceof AuthApiError) return error.message;
	if (error instanceof HttpError) return error.message;

	if (isAxiosError(error)) {
		const data = error.response?.data;
		if (data && typeof data === 'object' && 'message' in data) {
			const msg = (data as { message: unknown }).message;
			if (typeof msg === 'string' && msg.trim()) return msg;
		}
		const fromAxios = axiosUserMessage(error.code, Boolean(error.response));
		return fromAxios || error.message || GENERIC_MESSAGE;
	}

	if (error instanceof CanceledError) {
		return '';
	}

	if (error instanceof DOMException && error.name === 'AbortError') {
		return TIMEOUT_LOGIN_MESSAGE;
	}
	if (error instanceof TypeError) {
		return NETWORK_MESSAGE;
	}
	if (error instanceof Error) return error.message || GENERIC_MESSAGE;
	return GENERIC_MESSAGE;
}

export function getLoginErrorMessage(error: unknown): string {
	const msg = getErrorMessage(error);
	return msg || 'Произошла ошибка при авторизации';
}

export function getProductsErrorMessage(error: unknown): string {
	const msg = getErrorMessage(error);
	return msg || 'Ошибка загрузки';
}
