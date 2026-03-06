import { API_BASE_URL, API_ENDPOINTS } from '../config';
import { PRODUCTS_PER_PAGE } from '@shared/constants';
import type { ProductsResponse } from './types';
import type { SortField, SortOrder } from '@shared/lib/storage';

export interface FetchProductsParams {
	page?: number;
	sortBy?: SortField | null;
	order?: SortOrder | null;
}

export async function fetchProducts(
	params: FetchProductsParams = {},
	signal?: AbortSignal,
): Promise<ProductsResponse> {
	const { page = 1, sortBy, order } = params;
	const skip = (page - 1) * PRODUCTS_PER_PAGE;

	const searchParams = new URLSearchParams({
		limit: String(PRODUCTS_PER_PAGE),
		skip: String(skip),
	});

	if (sortBy && order) {
		searchParams.set('sortBy', sortBy);
		searchParams.set('order', order);
	}

	const url = `${API_BASE_URL}${API_ENDPOINTS.products}?${searchParams.toString()}`;

	const response = await fetch(url, { signal });

	if (!response.ok) {
		throw new Error('Ошибка при загрузке товаров');
	}

	return response.json() as Promise<ProductsResponse>;
}

export async function searchProducts(
	query: string,
	page = 1,
	signal?: AbortSignal,
): Promise<ProductsResponse> {
	const skip = (page - 1) * PRODUCTS_PER_PAGE;

	const searchParams = new URLSearchParams({
		q: query,
		limit: String(PRODUCTS_PER_PAGE),
		skip: String(skip),
	});

	const url = `${API_BASE_URL}${API_ENDPOINTS.products}/search?${searchParams.toString()}`;

	const response = await fetch(url, { signal });

	if (!response.ok) {
		throw new Error('Ошибка при поиске товаров');
	}

	return response.json() as Promise<ProductsResponse>;
}
