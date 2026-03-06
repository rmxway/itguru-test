import { useProductsQuery } from '@shared/lib/hooks';
import { RefreshIcon, PlusCircleIcon } from '@shared/assets/icons';
import { ProductRow } from './ProductRow';
import { Pagination } from './Pagination';
import {
	TableWrapper,
	TableHeader,
	TableTitle,
	TableActions,
	RefreshButton,
	AddButton,
	TableGrid,
	ColumnHeaders,
	ProductColumnHeader,
	HeaderCheckbox,
	HeaderLabel,
	DetailsColumnHeaders,
	DetailsHeaderItem,
	HeaderActionsSpacer,
	ProductRows,
	LoadingMessage,
	ErrorMessage,
	ScrollForTable,
} from './styled';

interface ProductsTableProps {
	page: number;
	onPageChange: (page: number) => void;
}

export function ProductsTable({ page, onPageChange }: ProductsTableProps) {
	const {
		products,
		isLoading,
		isError,
		error,
		total,
		totalPages,
		start,
		end,
	} = useProductsQuery(page);

	if (isLoading) {
		return (
			<TableWrapper>
				<LoadingMessage>Загрузка товаров...</LoadingMessage>
			</TableWrapper>
		);
	}

	if (isError) {
		return (
			<TableWrapper>
				<ErrorMessage>
					{error instanceof Error ? error.message : 'Ошибка загрузки'}
				</ErrorMessage>
			</TableWrapper>
		);
	}

	return (
		<TableWrapper>
			<TableHeader>
				<TableTitle>Все позиции</TableTitle>
				<TableActions>
					<RefreshButton type="button" aria-label="Обновить">
						<RefreshIcon size={22} color="text.primary" />
					</RefreshButton>
					<AddButton type="button">
						<PlusCircleIcon size={22} color="white" />
						Добавить
					</AddButton>
				</TableActions>
			</TableHeader>
			<ScrollForTable>
				<TableGrid>
					<ColumnHeaders>
						<ProductColumnHeader>
							<HeaderCheckbox />
							<HeaderLabel>Наименование</HeaderLabel>
						</ProductColumnHeader>
						<DetailsColumnHeaders>
							<DetailsHeaderItem>Вендор</DetailsHeaderItem>
							<DetailsHeaderItem>Артикул</DetailsHeaderItem>
							<DetailsHeaderItem>Оценка</DetailsHeaderItem>
							<DetailsHeaderItem>Цена, ₽</DetailsHeaderItem>
							<HeaderActionsSpacer />
						</DetailsColumnHeaders>
					</ColumnHeaders>
					<ProductRows>
						{products.map((product) => (
							<ProductRow key={product.id} product={product} />
						))}
					</ProductRows>
				</TableGrid>
			</ScrollForTable>
			<Pagination
				currentPage={page}
				totalPages={totalPages}
				start={start}
				end={end}
				total={total}
				onPageChange={onPageChange}
			/>
		</TableWrapper>
	);
}
