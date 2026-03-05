export interface LoginRequest {
	username: string;
	password: string;
	expiresInMins?: number;
}

export interface LoginResponse {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	accessToken: string;
	refreshToken: string;
}

export interface ApiError {
	message: string;
}
