import { API_BASE_URL, API_ENDPOINTS } from '../config';
import { removeUser } from '@shared/lib/storage';
import { getAuthHeaders } from '@shared/lib/security/csrf';

type FetchInput = RequestInfo | URL;
type FetchInit = RequestInit;

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function doRefresh(): Promise<boolean> {
	const response = await fetch(
		`${API_BASE_URL}${API_ENDPOINTS.auth.refresh}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...getAuthHeaders(),
			},
			body: JSON.stringify({}),
			credentials: 'include',
		},
	);

	if (!response.ok) {
		removeUser();
		window.location.href = '/login';
		return false;
	}

	return true;
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
		credentials: init.credentials ?? 'include',
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
