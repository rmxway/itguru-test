import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

function shouldRetry(failureCount: number, error: unknown): boolean {
	if (failureCount >= 2) return false;
	if (isAxiosError(error) && error.response) {
		const s = error.response.status;
		if (s >= 400 && s < 500 && s !== 408 && s !== 429) return false;
	}
	return true;
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: shouldRetry,
			refetchOnWindowFocus: false,
		},
	},
});
