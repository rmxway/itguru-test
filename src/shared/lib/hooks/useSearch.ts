import { useState, useCallback, useRef, useEffect } from 'react';

const SEARCH_DEBOUNCE_MS = 500;

interface UseSearchProps {
	onSearch: (query: string | null) => void;
}

export function useSearch({ onSearch }: UseSearchProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [appliedSearchQuery, setAppliedSearchQuery] = useState<string | null>(
		null,
	);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const isMountedRef = useRef(true);

	const applySearch = useCallback(
		(query: string) => {
			const trimmed = query.trim() || null;
			setAppliedSearchQuery(trimmed);
			onSearch(trimmed);
		},
		[onSearch],
	);

	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setSearchQuery(value);

			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
			}

			debounceRef.current = setTimeout(() => {
				debounceRef.current = null;
				if (isMountedRef.current) {
					applySearch(value);
				}
			}, SEARCH_DEBOUNCE_MS);
		},
		[applySearch],
	);

	const handleSearchKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				if (debounceRef.current) {
					clearTimeout(debounceRef.current);
					debounceRef.current = null;
				}
				if (isMountedRef.current) {
					applySearch(searchQuery);
				}
			}
		},
		[applySearch, searchQuery],
	);

	const handleClearSearch = useCallback(() => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
			debounceRef.current = null;
		}
		setSearchQuery('');
		setAppliedSearchQuery(null);
		onSearch(null);
	}, [onSearch]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
			}
		};
	}, []);

	return {
		searchQuery,
		appliedSearchQuery,
		handleSearchChange,
		handleSearchKeyDown,
		handleClearSearch,
	};
}
