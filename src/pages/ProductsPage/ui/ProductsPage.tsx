import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@shared/lib/hooks';
import { getUser } from '@shared/lib/storage';
import { Page, Header, Username, LogoutLink, Content, Title } from './styled';
import { Container, Flex } from '@shared/layouts';

export function ProductsPage() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const user = getUser();

	useEffect(() => {
		if (!user) {
			navigate('/login', { replace: true });
		}
	}, [user, navigate]);

	const handleLogout = () => {
		logout();
		navigate('/login', { replace: true, state: { fromLogout: true } });
	};

	if (!user) {
		return null;
	}

	return (
		<Page>
			<Header>
				<Container>
					<Flex $justify="space-between">
						<Username>{user.username}</Username>
						<LogoutLink
							href="#"
							onClick={(e) => {
								e.preventDefault();
								handleLogout();
							}}
						>
							Выйти
						</LogoutLink>
					</Flex>
				</Container>
			</Header>
			<Content>
				<Title>Продукты</Title>
			</Content>
		</Page>
	);
}
