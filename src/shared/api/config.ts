import { API_REMOTE_URL } from '@shared/constants';

export const API_BASE_URL = import.meta.env.DEV ? '/api' : API_REMOTE_URL;

export const API_ENDPOINTS = {
	auth: {
		login: '/auth/login',
		me: '/auth/me',
		refresh: '/auth/refresh',
	},
	products: '/products',
} as const;
