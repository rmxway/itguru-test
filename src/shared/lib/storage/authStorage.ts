const USER_KEY = 'user';

type AuthStorage = typeof localStorage | typeof sessionStorage;

function getStorage(rememberMe: boolean): AuthStorage {
	return rememberMe ? localStorage : sessionStorage;
}

/**
 * Токены авторизации хранятся в cookies (HttpOnly при использовании DummyJSON).
 * Данные пользователя сохраняются в storage для отображения в UI.
 */
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
