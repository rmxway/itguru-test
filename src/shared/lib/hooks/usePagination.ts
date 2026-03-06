import { useSearchParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';

interface UsePaginationProps {
	enabled?: boolean;
}

export function usePagination({ enabled = true }: UsePaginationProps = {}) {
	const [searchParams, setSearchParams] = useSearchParams();

	const pageFromUrl = parseInt(searchParams.get('page') ?? '1', 10);
	const page = pageFromUrl >= 1 ? pageFromUrl : 1;

	const handlePageChange = useCallback(
		(newPage: number) => {
			setSearchParams({ page: String(newPage) }, { replace: false });
		},
		[setSearchParams],
	);

	const resetToFirstPage = useCallback(() => {
		setSearchParams({ page: '1' }, { replace: false });
	}, [setSearchParams]);

	useEffect(() => {
		if (enabled && !searchParams.has('page')) {
			setSearchParams({ page: '1' }, { replace: true });
		}
	}, [enabled, searchParams, setSearchParams]);

	return {
		page,
		handlePageChange,
		resetToFirstPage,
	};
}
