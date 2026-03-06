import type { Product } from '@shared/api/products/types';

const SORT_STATE_KEY = 'productsSortState';

export type SortField = keyof Product;
export type SortOrder = 'asc' | 'desc';

export interface SortState {
	field: SortField;
	order: SortOrder;
}

export function saveSortState(state: SortState): void {
	localStorage.setItem(SORT_STATE_KEY, JSON.stringify(state));
}

export function getSortState(): SortState | null {
	const raw = localStorage.getItem(SORT_STATE_KEY);
	if (!raw) return null;

	try {
		return JSON.parse(raw) as SortState;
	} catch {
		return null;
	}
}

export function removeSortState(): void {
	localStorage.removeItem(SORT_STATE_KEY);
}
