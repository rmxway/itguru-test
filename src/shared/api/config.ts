export const API_BASE_URL = 'https://dummyjson.com';

export const API_ENDPOINTS = {
	auth: {
		login: '/auth/login',
		me: '/auth/me',
		refresh: '/auth/refresh',
	},
} as const;
