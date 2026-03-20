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

export interface AuthMeUser {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
}

export interface RefreshTokenResponse {
	accessToken: string;
	refreshToken: string;
}

export interface Product {
	id: number | string;
	title: string;
	category: string;
	brand: string;
	price: number;
	rating: number;
	thumbnail: string;
	sku?: string;
}

export interface ProductsResponse {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
}

export type SortField = keyof Product;
export type SortOrder = 'asc' | 'desc';

export interface SortState {
	field: SortField;
	order: SortOrder;
}

export interface LoginFormData {
	login: string;
	password: string;
	rememberMe: boolean;
}

export interface AddProductFormData {
	title: string;
	price: number;
	brand: string;
	sku: string;
}

export interface LoginVariables {
	username: string;
	password: string;
	rememberMe: boolean;
}

export interface UseProductsQueryParams {
	page: number;
	searchQuery?: string | null;
	sortBy?: SortField | null;
	order?: SortOrder | null;
}

export interface FetchProductsParams {
	page?: number;
	sortBy?: SortField | null;
	order?: SortOrder | null;
}
