import { API_BASE_URL, API_ENDPOINTS } from '../config';
import { getAuthHeaders } from '@shared/lib/security/csrf';

export interface AuthMeUser {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
}

export async function fetchAuthMe(): Promise<AuthMeUser | null> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.me}`, {
		headers: getAuthHeaders(),
		credentials: 'omit',
	});

	if (!response.ok) {
		return null;
	}

	try {
		const data = (await response.json()) as AuthMeUser;
		return data;
	} catch {
		return null;
	}
}
