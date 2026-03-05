const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

type AuthStorage = typeof localStorage | typeof sessionStorage;

function getStorage(rememberMe: boolean): AuthStorage {
	return rememberMe ? localStorage : sessionStorage;
}

export function saveToken(
	accessToken: string,
	refreshToken: string,
	rememberMe: boolean,
): void {
	const storage = getStorage(rememberMe);
	storage.setItem(ACCESS_TOKEN_KEY, accessToken);
	storage.setItem(REFRESH_TOKEN_KEY, refreshToken);

	const otherStorage = rememberMe ? sessionStorage : localStorage;
	otherStorage.removeItem(ACCESS_TOKEN_KEY);
	otherStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getToken(): string | null {
	return (
		localStorage.getItem(ACCESS_TOKEN_KEY) ??
		sessionStorage.getItem(ACCESS_TOKEN_KEY)
	);
}

export function removeToken(): void {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(REFRESH_TOKEN_KEY);
	sessionStorage.removeItem(ACCESS_TOKEN_KEY);
	sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

export interface StoredUser {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
}

export function saveUser(user: StoredUser, rememberMe: boolean): void {
	const storage = getStorage(rememberMe);
	storage.setItem(USER_KEY, JSON.stringify(user));

	const otherStorage = rememberMe ? sessionStorage : localStorage;
	otherStorage.removeItem(USER_KEY);
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

export function removeUser(): void {
	localStorage.removeItem(USER_KEY);
	sessionStorage.removeItem(USER_KEY);
}
