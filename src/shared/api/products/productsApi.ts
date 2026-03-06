import { API_BASE_URL, API_ENDPOINTS } from '../config';
import { PRODUCTS_PER_PAGE } from '@shared/constants';
import type { ProductsResponse } from './types';

export async function fetchProducts(
	page = 1,
	signal?: AbortSignal,
): Promise<ProductsResponse> {
	const skip = (page - 1) * PRODUCTS_PER_PAGE;
	const url = `${API_BASE_URL}${API_ENDPOINTS.products}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;

	const response = await fetch(url, { signal });

	if (!response.ok) {
		throw new Error('Ошибка при загрузке товаров');
	}

	return response.json() as Promise<ProductsResponse>;
}
