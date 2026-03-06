import { QueryClientProvider } from '@tanstack/react-query';
import type { ChildrenProps } from '@shared/types';
import { queryClient } from './queryClient';

export function QueryProvider({ children }: ChildrenProps) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}
