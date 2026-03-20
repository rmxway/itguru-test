import { useState, useCallback, useMemo } from 'react';
import { queryClient } from '@app/providers/queryClient';
import { useProductsQuery } from '@shared/lib/hooks';
import { getProductsErrorMessage } from '@shared/lib/errors/getErrorMessage';
import { RefreshIcon, PlusCircleIcon, SortIcon } from '@shared/assets/icons';
import { Preloader } from '@shared/ui/Preloader';
import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/Modal';
import toast from 'react-hot-toast';
import type {
	AddProductFormData,
	Product,
	ProductsResponse,
	SortField,
	SortOrder,
} from '@shared/types';
import { AddProductForm } from '@widgets/AddProductForm';
import { Checkbox } from '@shared/ui';
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
	HeaderLabel,
	DetailsColumnHeaders,
	DetailsHeaderItem,
	HeaderActionsSpacer,
	ProductRows,
	ErrorMessage,
	ErrorState,
	ScrollForTable,
	SortableHeader,
} from './styled';

interface ProductsTableProps {
	page: number;
	onPageChange: (page: number) => void;
	searchQuery?: string | null;
	sortBy: SortField | null;
	sortOrder: SortOrder | null;
	onSortChange: (field: SortField) => void;
}

export function ProductsTable({
	page,
	onPageChange,
	searchQuery = null,
	sortBy,
	sortOrder,
	onSortChange,
}: ProductsTableProps) {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [selectedIds, setSelectedIds] = useState<Set<number | string>>(
		new Set(),
	);

	const handleToggleSelect = useCallback((id: number | string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	}, []);

	const {
		products,
		isFetching,
		isError,
		error,
		total,
		totalPages,
		start,
		end,
		refetch,
	} = useProductsQuery({
		page,
		searchQuery,
		sortBy,
		order: sortOrder,
	});

	const currentPageIds = useMemo(
		() => new Set(products.map((p) => p.id)),
		[products],
	);

	const allCurrentPageSelected = useMemo(
		() =>
			products.length > 0 && products.every((p) => selectedIds.has(p.id)),
		[products, selectedIds],
	);

	const handleToggleSelectAll = useCallback(() => {
		setSelectedIds((prev) => {
			const allSelected =
				currentPageIds.size > 0 &&
				[...currentPageIds].every((id) => prev.has(id));
			const next = new Set(prev);
			if (allSelected) {
				currentPageIds.forEach((id) => next.delete(id));
			} else {
				currentPageIds.forEach((id) => next.add(id));
			}
			return next;
		});
	}, [currentPageIds]);

	const handleAddProduct = (data: AddProductFormData) => {
		const newProduct: Product = {
			id: `temp-${crypto.randomUUID()}`,
			title: data.title,
			brand: data.brand,
			price: data.price,
			sku: data.sku,
			category: '',
			thumbnail: '',
			rating: 0,
		};

		const queryKey = ['products', page, searchQuery, sortBy, sortOrder];
		const cached = queryClient.getQueryData<ProductsResponse>(queryKey);

		if (cached) {
			queryClient.setQueryData<ProductsResponse>(queryKey, {
				...cached,
				products: [newProduct, ...cached.products],
				total: cached.total + 1,
			});
		}

		toast.success('Товар успешно добавлен');
		setIsAddModalOpen(false);
	};

	if (isError) {
		return (
			<TableWrapper>
				<ErrorState>
					<ErrorMessage>
						{getProductsErrorMessage(error)}
					</ErrorMessage>
					<Button type="button" onClick={() => void refetch()}>
						Повторить
					</Button>
				</ErrorState>
			</TableWrapper>
		);
	}

	return (
		<TableWrapper>
			{isFetching && <Preloader />}
			<TableHeader>
				<TableTitle>Все позиции</TableTitle>
				<TableActions>
					<RefreshButton
						type="button"
						aria-label="Обновить"
						onClick={() => refetch()}
					>
						<RefreshIcon size={22} color="text.primary" />
					</RefreshButton>
					<AddButton
						type="button"
						onClick={() => setIsAddModalOpen(true)}
					>
						<PlusCircleIcon size={22} color="white" />
						Добавить
					</AddButton>
				</TableActions>
			</TableHeader>
			{products.length === 0 && !isFetching && <>Товары не найдены</>}
			{products.length > 0 && (
				<>
					<ScrollForTable>
						<TableGrid>
							<ColumnHeaders>
								<ProductColumnHeader>
									<Checkbox
										checked={allCurrentPageSelected}
										onChange={handleToggleSelectAll}
									/>
									<HeaderLabel>
										<SortableHeader
											type="button"
											$align="left"
											onClick={() =>
												onSortChange('title')
											}
										>
											Наименование
											{sortBy === 'title' && (
												<SortIcon
													size={14}
													direction={
														sortOrder ?? 'asc'
													}
												/>
											)}
										</SortableHeader>
									</HeaderLabel>
								</ProductColumnHeader>
								<DetailsColumnHeaders>
									<DetailsHeaderItem>
										<SortableHeader
											type="button"
											onClick={() =>
												onSortChange('brand')
											}
										>
											Вендор
											{sortBy === 'brand' && (
												<SortIcon
													size={14}
													direction={
														sortOrder ?? 'asc'
													}
												/>
											)}
										</SortableHeader>
									</DetailsHeaderItem>
									<DetailsHeaderItem>
										<SortableHeader
											type="button"
											onClick={() => onSortChange('sku')}
										>
											Артикул
											{sortBy === 'sku' && (
												<SortIcon
													size={14}
													direction={
														sortOrder ?? 'asc'
													}
												/>
											)}
										</SortableHeader>
									</DetailsHeaderItem>
									<DetailsHeaderItem>
										<SortableHeader
											type="button"
											onClick={() =>
												onSortChange('rating')
											}
										>
											Оценка
											{sortBy === 'rating' && (
												<SortIcon
													size={14}
													direction={
														sortOrder ?? 'asc'
													}
												/>
											)}
										</SortableHeader>
									</DetailsHeaderItem>
									<DetailsHeaderItem>
										<SortableHeader
											type="button"
											onClick={() =>
												onSortChange('price')
											}
										>
											Цена, $
											{sortBy === 'price' && (
												<SortIcon
													size={14}
													direction={
														sortOrder ?? 'asc'
													}
												/>
											)}
										</SortableHeader>
									</DetailsHeaderItem>
									<HeaderActionsSpacer />
								</DetailsColumnHeaders>
							</ColumnHeaders>
							<ProductRows>
								{products.map((product) => (
									<ProductRow
										key={product.id}
										product={product}
										selected={selectedIds.has(product.id)}
										onSelectChange={handleToggleSelect}
									/>
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
				</>
			)}
			<Modal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
			>
				<AddProductForm
					onSubmit={handleAddProduct}
					onCancel={() => setIsAddModalOpen(false)}
				/>
			</Modal>
		</TableWrapper>
	);
}
