import { useState, useCallback } from 'react';
import {
	getSortState,
	saveSortState,
	removeSortState,
	type SortField,
	type SortOrder,
} from '@shared/lib/storage';

function getNextSortState(
	field: SortField,
	currentField: SortField | null,
	currentOrder: SortOrder | null,
): { field: SortField | null; order: SortOrder | null } {
	if (currentField !== field) {
		return { field, order: 'asc' };
	}
	if (currentOrder === 'asc') {
		return { field, order: 'desc' };
	}
	return { field: null, order: null };
}

interface UseSortProps {
	onSortChange?: () => void;
}

export function useSort({ onSortChange }: UseSortProps = {}) {
	const initialSort = getSortState();
	const [sortState, setSortState] = useState<{
		field: SortField | null;
		order: SortOrder | null;
	}>({
		field: initialSort?.field ?? null,
		order: initialSort?.order ?? null,
	});

	const handleSortChange = useCallback(
		(field: SortField) => {
			setSortState((prev) => {
				const next = getNextSortState(field, prev.field, prev.order);
				if (next.field && next.order) {
					saveSortState({ field: next.field, order: next.order });
				} else {
					removeSortState();
				}
				return next;
			});
			onSortChange?.();
		},
		[onSortChange],
	);

	return {
		sortField: sortState.field,
		sortOrder: sortState.order,
		handleSortChange,
	};
}
