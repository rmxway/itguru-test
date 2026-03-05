import { useState, useCallback } from 'react';
import { login as loginApi, AuthApiError } from '@shared/api/auth';
import {
	saveToken,
	saveUser,
	removeToken,
	removeUser,
} from '@shared/lib/storage';

const NETWORK_ERROR_MESSAGE = 'Нет подключения к сети';

export function useAuth() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const login = useCallback(
		async (username: string, password: string, rememberMe: boolean) => {
			setError(null);
			setIsLoading(true);

			try {
				const response = await loginApi(username, password);

				saveToken(
					response.accessToken,
					response.refreshToken,
					rememberMe,
				);

				saveUser(
					{
						id: response.id,
						username: response.username,
						email: response.email,
						firstName: response.firstName,
						lastName: response.lastName,
					},
					rememberMe,
				);

				return true;
			} catch (err) {
				const message =
					err instanceof AuthApiError
						? err.message
						: err instanceof TypeError
							? NETWORK_ERROR_MESSAGE
							: 'Произошла ошибка при авторизации';

				setError(message);
				return false;
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	const logout = useCallback(() => {
		removeToken();
		removeUser();
		setError(null);
	}, []);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	return { login, logout, isLoading, error, clearError };
}
