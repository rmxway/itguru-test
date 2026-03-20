import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, searchProducts } from '@shared/api/products';
import { PRODUCTS_PER_PAGE } from '@shared/constants';
import type {
	Product,
	SortField,
	SortOrder,
	UseProductsQueryParams,
} from '@shared/types';

function sortProducts(
	products: Product[],
	sortBy: SortField | null,
	order: SortOrder | null,
): Product[] {
	if (!sortBy || !order) return products;

	return [...products].sort((a, b) => {
		const aVal = a[sortBy];
		const bVal = b[sortBy];

		if (typeof aVal === 'number' && typeof bVal === 'number') {
			return order === 'asc' ? aVal - bVal : bVal - aVal;
		}

		const aStr = String(aVal ?? '');
		const bStr = String(bVal ?? '');
		const cmp = aStr.localeCompare(bStr);
		return order === 'asc' ? cmp : -cmp;
	});
}

function shouldRetryQuery(failureCount: number, error: unknown): boolean {
	if (failureCount >= 2) return false;
	if (
		error != null &&
		typeof error === 'object' &&
		'response' in error &&
		(error as { response?: { status?: number } }).response?.status != null
	) {
		const status = (error as { response: { status: number } }).response
			.status;
		if (status >= 400 && status < 500 && status !== 408) return false;
	}
	return true;
}

export function useProductsQuery({
	page,
	searchQuery = null,
	sortBy = null,
	order = null,
}: UseProductsQueryParams) {
	const query = useQuery({
		queryKey: ['products', page, searchQuery, sortBy, order],
		queryFn: ({ signal }) =>
			searchQuery
				? searchProducts(searchQuery, page, signal)
				: fetchProducts({ page, sortBy, order }, signal),
		placeholderData: (previousData) => previousData,
		retry: shouldRetryQuery,
	});

	const products = useMemo(() => {
		const raw = query.data?.products ?? [];
		if (searchQuery && sortBy && order) {
			return sortProducts(raw, sortBy, order);
		}
		return raw;
	}, [query.data?.products, searchQuery, sortBy, order]);

	const total = query.data?.total ?? 0;
	const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
	const start = (page - 1) * PRODUCTS_PER_PAGE + 1;
	const end = Math.min(page * PRODUCTS_PER_PAGE, total);

	return {
		...query,
		products,
		total,
		totalPages,
		start,
		end,
		currentPage: page,
	};
}
