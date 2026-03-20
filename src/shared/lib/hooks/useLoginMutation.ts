import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '@shared/api/auth';
import { LOGIN_TIMEOUT_MS } from '@shared/constants';
import { saveUser } from '@shared/lib/storage';
import type { LoginVariables } from '@shared/types';

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
