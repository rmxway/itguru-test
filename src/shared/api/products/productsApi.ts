import { API_ENDPOINTS } from '../config';
import { PRODUCTS_PER_PAGE } from '@shared/constants';
import { api } from '../httpClient';
import type { FetchProductsParams, ProductsResponse } from '@shared/types';

export async function fetchProducts(
	params: FetchProductsParams = {},
	signal?: AbortSignal,
): Promise<ProductsResponse> {
	const { page = 1, sortBy, order } = params;
	const skip = (page - 1) * PRODUCTS_PER_PAGE;

	const query: Record<string, string | number> = {
		limit: PRODUCTS_PER_PAGE,
		skip,
	};

	if (sortBy && order) {
		query.sortBy = sortBy;
		query.order = order;
	}

	const { data } = await api.get<ProductsResponse>(API_ENDPOINTS.products, {
		params: query,
		signal,
	});
	return data;
}

export async function searchProducts(
	query: string,
	page = 1,
	signal?: AbortSignal,
): Promise<ProductsResponse> {
	const skip = (page - 1) * PRODUCTS_PER_PAGE;

	const { data } = await api.get<ProductsResponse>(
		`${API_ENDPOINTS.products}/search`,
		{
			params: {
				q: query,
				limit: PRODUCTS_PER_PAGE,
				skip,
			},
			signal,
		},
	);
	return data;
}
