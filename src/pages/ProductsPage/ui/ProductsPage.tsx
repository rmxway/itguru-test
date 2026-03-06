import { useAuth, usePagination, useSearch, useSort } from '@shared/lib/hooks';
import {
	Page,
	Header,
	HeaderRight,
	PageTitle,
	SearchInputWrapper,
	Username,
	LogoutLink,
	Content,
} from './styled';
import { Input } from '@shared/ui';
import { SearchIcon, CloseIcon } from '@shared/assets/icons';
import { ProductsTable } from '@widgets/ProductsTable';

export function ProductsPage() {
	const { user, handleLogout } = useAuth();
	const { page, handlePageChange, resetToFirstPage } = usePagination({
		enabled: !!user,
	});
	const { sortField, sortOrder, handleSortChange } = useSort({
		onSortChange: resetToFirstPage,
	});
	const {
		searchQuery,
		appliedSearchQuery,
		handleSearchChange,
		handleSearchKeyDown,
		handleClearSearch,
	} = useSearch({
		onSearch: resetToFirstPage,
	});

	if (!user) {
		return null;
	}

	return (
		<Page>
			<Header>
				<PageTitle>Товары</PageTitle>
				<SearchInputWrapper>
					<Input
						type="text"
						placeholder="Найти"
						value={searchQuery}
						onChange={handleSearchChange}
						onKeyDown={handleSearchKeyDown}
						aria-label="Поиск товаров"
						leftIcon={
							<SearchIcon size={24} color="text.placeholder" />
						}
						rightIcon={
							searchQuery ? (
								<CloseIcon size={24} color="text.icon" />
							) : undefined
						}
						onRightIconClick={handleClearSearch}
					/>
				</SearchInputWrapper>
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
				<ProductsTable
					page={page}
					onPageChange={handlePageChange}
					searchQuery={appliedSearchQuery}
					sortBy={sortField}
					sortOrder={sortOrder}
					onSortChange={handleSortChange}
				/>
			</Content>
		</Page>
	);
}
