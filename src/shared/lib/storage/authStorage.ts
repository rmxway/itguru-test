const USER_KEY = 'user';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

type AuthStorage = typeof localStorage | typeof sessionStorage;

function getStorage(rememberMe: boolean): AuthStorage {
	return rememberMe ? localStorage : sessionStorage;
}

export interface StoredUser {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
}

export function saveUser(
	user: StoredUser,
	accessToken: string,
	refreshToken: string,
	rememberMe: boolean,
): void {
	const storage = getStorage(rememberMe);
	const otherStorage = rememberMe ? sessionStorage : localStorage;

	storage.setItem(USER_KEY, JSON.stringify(user));
	storage.setItem(ACCESS_TOKEN_KEY, accessToken);
	storage.setItem(REFRESH_TOKEN_KEY, refreshToken);

	otherStorage.removeItem(USER_KEY);
	otherStorage.removeItem(ACCESS_TOKEN_KEY);
	otherStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function saveTokens(
	accessToken: string,
	refreshToken: string,
	rememberMe: boolean,
): void {
	const storage = getStorage(rememberMe);
	const otherStorage = rememberMe ? sessionStorage : localStorage;

	storage.setItem(ACCESS_TOKEN_KEY, accessToken);
	storage.setItem(REFRESH_TOKEN_KEY, refreshToken);

	otherStorage.removeItem(ACCESS_TOKEN_KEY);
	otherStorage.removeItem(REFRESH_TOKEN_KEY);
}

function getStorageWithRefreshToken(): AuthStorage | null {
	if (localStorage.getItem(REFRESH_TOKEN_KEY)) return localStorage;
	if (sessionStorage.getItem(REFRESH_TOKEN_KEY)) return sessionStorage;
	return null;
}

export function saveTokensFromRefresh(
	accessToken: string,
	refreshToken: string,
): void {
	const storage = getStorageWithRefreshToken();
	if (!storage) return;
	storage.setItem(ACCESS_TOKEN_KEY, accessToken);
	storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getUser(): StoredUser | null {
	const raw =
		localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);
	if (!raw) return null;

	try {
		return JSON.parse(raw) as StoredUser;
	} catch {
		return null;
	}
}

export function getAccessToken(): string | null {
	return (
		localStorage.getItem(ACCESS_TOKEN_KEY) ??
		sessionStorage.getItem(ACCESS_TOKEN_KEY)
	);
}

export function getRefreshToken(): string | null {
	return (
		localStorage.getItem(REFRESH_TOKEN_KEY) ??
		sessionStorage.getItem(REFRESH_TOKEN_KEY)
	);
}

export function removeUser(): void {
	localStorage.removeItem(USER_KEY);
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(REFRESH_TOKEN_KEY);
	sessionStorage.removeItem(USER_KEY);
	sessionStorage.removeItem(ACCESS_TOKEN_KEY);
	sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}
