import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { fetchAuthMe } from '@shared/api/auth';
import { getErrorMessage } from '@shared/lib/errors/getErrorMessage';
import { getUser, removeUser } from '@shared/lib/storage';
import { Button } from '@shared/ui/Button';
import { Preloader } from '@shared/ui/Preloader';

const PreloaderWrapper = styled.div`
	position: relative;
	min-height: 100vh;
`;

const ErrorBox = styled.div`
	padding: 2rem;
	text-align: center;
	font-family: ${({ theme }) => theme.fonts.primary};
`;

const ErrorText = styled.p`
	color: ${({ theme }) => theme.colors.error};
	margin: 0 0 1rem;
`;

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const user = getUser();

	const {
		data: meUser,
		isLoading,
		isError,
		error,
		refetch,
		isFetching,
	} = useQuery({
		queryKey: ['auth', 'me'],
		queryFn: ({ signal }) => fetchAuthMe(signal),
		enabled: Boolean(user),
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

	if (isError) {
		const msg =
			getErrorMessage(error) || 'Не удалось проверить авторизацию';
		return (
			<ErrorBox>
				<ErrorText>{msg}</ErrorText>
				<Button
					type="button"
					onClick={() => void refetch()}
					disabled={isFetching}
				>
					{isFetching ? 'Загрузка…' : 'Повторить'}
				</Button>
			</ErrorBox>
		);
	}

	if (meUser == null) {
		removeUser();
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
}
