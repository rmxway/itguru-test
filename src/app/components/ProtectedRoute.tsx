import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { fetchAuthMe } from '@shared/api/auth';
import { getUser, removeUser } from '@shared/lib/storage';
import { Preloader } from '@shared/ui/Preloader';

const PreloaderWrapper = styled.div`
	position: relative;
	min-height: 100vh;
`;

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const user = getUser();

	const { data: meUser, isLoading } = useQuery({
		queryKey: ['auth', 'me'],
		queryFn: fetchAuthMe,
		enabled: !!user,
		staleTime: 5 * 60 * 1000,
		retry: false,
	});

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (isLoading) {
		return (
			<PreloaderWrapper>
				<Preloader />
			</PreloaderWrapper>
		);
	}

	if (!meUser) {
		removeUser();
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
}
