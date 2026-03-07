import { useMutation } from '@tanstack/react-query';
import { login as loginApi, AuthApiError } from '@shared/api/auth';
import { LOGIN_TIMEOUT_MS } from '@shared/constants';
import { saveUser } from '@shared/lib/storage';

const NETWORK_ERROR_MESSAGE = 'Нет подключения к сети';
const TIMEOUT_ERROR_MESSAGE = `Превышено время ожидания (${LOGIN_TIMEOUT_MS / 1000} секунд)`;

export interface LoginVariables {
	username: string;
	password: string;
	rememberMe: boolean;
}

export function useLoginMutation() {
	return useMutation({
		mutationKey: ['login'],
		mutationFn: async ({ username, password }: LoginVariables) => {
			const controller = new AbortController();
			const timeoutId = setTimeout(
				() => controller.abort(),
				LOGIN_TIMEOUT_MS,
			);

			try {
				return await loginApi(username, password, controller.signal);
			} finally {
				clearTimeout(timeoutId);
			}
		},
		onSuccess: (data, variables) => {
			const { rememberMe } = variables;
			saveUser(
				{
					id: data.id,
					username: data.username,
					email: data.email,
					firstName: data.firstName,
					lastName: data.lastName,
				},
				data.accessToken,
				data.refreshToken,
				rememberMe,
			);
		},
	});
}

export function getLoginErrorMessage(error: unknown): string {
	if (error instanceof AuthApiError) {
		return error.message;
	}
	if (error instanceof DOMException && error.name === 'AbortError') {
		return TIMEOUT_ERROR_MESSAGE;
	}
	if (error instanceof TypeError) {
		return NETWORK_ERROR_MESSAGE;
	}
	return 'Произошла ошибка при авторизации';
}
