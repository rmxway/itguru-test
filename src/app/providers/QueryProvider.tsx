import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ChildrenProps } from '@shared/types';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

export function QueryProvider({ children }: ChildrenProps) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}
