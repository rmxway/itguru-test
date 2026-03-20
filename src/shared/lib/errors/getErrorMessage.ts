import { isAxiosError, CanceledError } from 'axios';
import { LOGIN_TIMEOUT_USER_MESSAGE } from '@shared/constants';
import { AuthApiError } from '@shared/api/auth/authApi';
import { HttpError } from '@shared/api/errors';

const GENERIC_MESSAGE = 'Произошла ошибка';
const NETWORK_MESSAGE = 'Нет подключения к сети';

function axiosUserMessage(hasResponse: boolean): string {
	return hasResponse ? GENERIC_MESSAGE : NETWORK_MESSAGE;
}

export function getErrorMessage(error: unknown): string {
	if (error == null) return GENERIC_MESSAGE;
	if (typeof error === 'string') return error;
	if (error instanceof AuthApiError) return error.message;
	if (error instanceof HttpError) return error.message;

	if (isAxiosError(error)) {
		if (error instanceof CanceledError || error.code === 'ERR_CANCELED') {
			return '';
		}
		const data = error.response?.data;
		if (data && typeof data === 'object' && 'message' in data) {
			const msg = (data as { message: unknown }).message;
			if (typeof msg === 'string' && msg.trim()) return msg;
		}
		const fromAxios = axiosUserMessage(Boolean(error.response));
		return fromAxios || error.message || GENERIC_MESSAGE;
	}

	if (error instanceof DOMException && error.name === 'AbortError') {
		return LOGIN_TIMEOUT_USER_MESSAGE;
	}
	if (error instanceof TypeError) {
		return NETWORK_MESSAGE;
	}
	if (error instanceof Error) return error.message || GENERIC_MESSAGE;
	return GENERIC_MESSAGE;
}

export function getLoginErrorMessage(error: unknown): string {
	const msg = getErrorMessage(error);
	if (msg === '') return '';
	return msg || 'Произошла ошибка при авторизации';
}

export function getProductsErrorMessage(error: unknown): string {
	const msg = getErrorMessage(error);
	return msg || 'Ошибка загрузки';
}
