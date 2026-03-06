import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@shared/api/products';
import { PRODUCTS_PER_PAGE } from '@shared/constants';

export function useProductsQuery(page: number) {
	const query = useQuery({
		queryKey: ['products', page],
		queryFn: ({ signal }) => fetchProducts(page, signal),
	});

	const total = query.data?.total ?? 0;
	const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
	const start = (page - 1) * PRODUCTS_PER_PAGE + 1;
	const end = Math.min(page * PRODUCTS_PER_PAGE, total);

	return {
		...query,
		products: query.data?.products ?? [],
		total,
		totalPages,
		start,
		end,
		currentPage: page,
	};
}
