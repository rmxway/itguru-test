import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './config';
import { logError } from '@shared/lib/logging/errorLogger';
import {
	getAccessToken,
	getRefreshToken,
	removeUser,
	saveTokensFromRefresh,
} from '@shared/lib/storage';
import type { RefreshTokenResponse } from '@shared/types';

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

export const publicApi = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: false,
});

export const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: false,
});

function redirectToLogin(): void {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	window.location.href = `${window.location.origin}${base}/login`;
}

async function doRefresh(): Promise<boolean> {
	const refreshToken = getRefreshToken();
	if (!refreshToken) {
		removeUser();
		redirectToLogin();
		return false;
	}
	try {
		const { data, status } = await publicApi.post<RefreshTokenResponse>(
			API_ENDPOINTS.auth.refresh,
			{ refreshToken, expiresInMins: 30 },
			{
				headers: { 'Content-Type': 'application/json' },
			},
		);
		if (status === 200 && data.accessToken && data.refreshToken) {
			saveTokensFromRefresh(data.accessToken, data.refreshToken);
			return true;
		}
	} catch (e) {
		logError(e, { context: 'tokenRefresh' });
	}
	removeUser();
	redirectToLogin();
	return false;
}

let refreshPromise: Promise<boolean> | null = null;

function runRefresh(): Promise<boolean> {
	refreshPromise ??= doRefresh().finally(() => {
		refreshPromise = null;
	});
	return refreshPromise;
}

function isAuthPath(url: string): boolean {
	return (
		url.includes(API_ENDPOINTS.auth.login) ||
		url.includes(API_ENDPOINTS.auth.refresh)
	);
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = getAccessToken();
	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(res) => res,
	async (error: AxiosError) => {
		const original = error.config as RetryConfig | undefined;
		if (!original || error.response?.status !== 401) {
			return Promise.reject(error);
		}

		const url = original.url ?? '';
		if (isAuthPath(url)) {
			return Promise.reject(error);
		}

		if (original._retry) {
			return Promise.reject(error);
		}

		const ok = await runRefresh();
		if (!ok) {
			return Promise.reject(error);
		}

		original._retry = true;
		const token = getAccessToken();
		original.headers = original.headers ?? {};
		if (token) {
			original.headers.Authorization = `Bearer ${token}`;
		}
		return api.request(original);
	},
);
