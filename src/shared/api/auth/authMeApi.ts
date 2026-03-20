import { API_ENDPOINTS } from '../config';
import { api } from '../httpClient';
import type { AuthMeUser } from '@shared/types';

export async function fetchAuthMe(signal?: AbortSignal): Promise<AuthMeUser> {
	const { data } = await api.get<AuthMeUser>(API_ENDPOINTS.auth.me, {
		signal,
	});
	return data;
}
