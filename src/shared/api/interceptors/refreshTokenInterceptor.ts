import { API_BASE_URL, API_ENDPOINTS } from '../config';
import {
	getRefreshToken,
	removeUser,
	saveTokensFromRefresh,
} from '@shared/lib/storage';
import { getAuthHeaders } from '@shared/lib/security/csrf';

type FetchInput = RequestInfo | URL;
type FetchInit = RequestInit;

interface RefreshResponse {
	accessToken: string;
	refreshToken: string;
}

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function doRefresh(): Promise<boolean> {
	const refreshToken = getRefreshToken();
	if (!refreshToken) {
		removeUser();
		redirectToLogin();
		return false;
	}

	const response = await fetch(
		`${API_BASE_URL}${API_ENDPOINTS.auth.refresh}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
			credentials: 'omit',
		},
	);

	if (!response.ok) {
		removeUser();
		redirectToLogin();
		return false;
	}

	try {
		const data = (await response.json()) as RefreshResponse;
		if (data.accessToken && data.refreshToken) {
			saveTokensFromRefresh(data.accessToken, data.refreshToken);
			return true;
		}
	} catch {
		// Invalid JSON response
	}
	removeUser();
	redirectToLogin();
	return false;
}

function redirectToLogin(): void {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	window.location.href = `${window.location.origin}${base}/login`;
}

async function tryRefresh(): Promise<boolean> {
	if (isRefreshing && refreshPromise) {
		return refreshPromise;
	}

	isRefreshing = true;
	refreshPromise = doRefresh().finally(() => {
		isRefreshing = false;
		refreshPromise = null;
	});

	return refreshPromise;
}

export async function fetchWithAuth(
	input: FetchInput,
	init: FetchInit = {},
): Promise<Response> {
	const mergedInit: FetchInit = {
		...init,
		credentials: 'omit',
		headers: {
			...getAuthHeaders(),
			...(init.headers as Record<string, string>),
		},
	};

	let response = await fetch(input, mergedInit);

	if (response.status === 401) {
		const refreshed = await tryRefresh();
		if (refreshed) {
			response = await fetch(input, mergedInit);
		}
	}

	return response;
}
