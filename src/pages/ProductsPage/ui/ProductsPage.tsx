import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser, removeToken, removeUser } from '@shared/lib/storage';
import {
	Page,
	Header,
	HeaderRight,
	PageTitle,
	SearchInput,
	Username,
	LogoutLink,
	Content,
} from './styled';
import { SearchIcon } from '@shared/assets/icons';
import { ProductsTable } from '@widgets/ProductsTable';

export function ProductsPage() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const user = getUser();

	const pageFromUrl = parseInt(searchParams.get('page') ?? '1', 10);
	const page = pageFromUrl >= 1 ? pageFromUrl : 1;

	const handlePageChange = (newPage: number) => {
		setSearchParams({ page: String(newPage) }, { replace: false });
	};

	useEffect(() => {
		if (user && !searchParams.has('page')) {
			setSearchParams({ page: '1' }, { replace: true });
		}
	}, [user, searchParams, setSearchParams]);

	useEffect(() => {
		if (!user) {
			navigate('/login', { replace: true });
		}
	}, [user, navigate]);

	const handleLogout = () => {
		removeToken();
		removeUser();
		navigate('/login', { replace: true, state: { fromLogout: true } });
	};

	if (!user) {
		return null;
	}

	return (
		<Page>
			<Header>
				<PageTitle>Товары</PageTitle>
				<SearchInput>
					<SearchIcon size={24} color="text.placeholder" />
					<span>Найти</span>
				</SearchInput>
				<HeaderRight>
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
				</HeaderRight>
			</Header>
			<Content>
				<ProductsTable page={page} onPageChange={handlePageChange} />
			</Content>
		</Page>
	);
}
