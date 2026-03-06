import { media } from '@app/styles/media';
import { TABLE_GRID_COLUMNS } from '@shared/constants';
import styled, { css } from 'styled-components';

export const TableWrapper = styled.div`
	${({ theme }) => css`
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 40px;
		background-color: ${theme.colors.white};
		border-radius: ${theme.radii.sm};
		padding: 30px;
		width: 100%;
	`}
`;

export const ScrollForTable = styled.div`
	${({ theme }) => css`
		width: 100%;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;

		&::-webkit-scrollbar {
			height: 8px;
		}

		&::-webkit-scrollbar-track {
			background: ${theme.colors.inputBg};
			border-radius: 4px;
		}

		&::-webkit-scrollbar-thumb {
			background: ${theme.colors.text.tertiary};
			border-radius: 4px;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: ${theme.colors.text.quaternary};
		}
	`}
`;

export const TableHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

export const TableTitle = styled.h2`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: 20px;
		font-weight: ${theme.fontWeights.semibold};
		line-height: 20px;
		color: ${theme.colors.text.primary};
		margin: 0;
	`}
`;

export const TableActions = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`;

export const RefreshButton = styled.button`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
		background-color: ${theme.colors.white};
		border: 1px solid ${theme.colors.borderGray};
		border-radius: 8px;
		cursor: pointer;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.8;
		}
	`}
`;

export const AddButton = styled.button`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 10px 20px;
		min-height: 42px;
		background-color: ${theme.colors.accent.primary};
		border: none;
		border-radius: 6px;
		color: #ebf3ea;
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.xs};
		font-weight: ${theme.fontWeights.semibold};
		cursor: pointer;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.9;
		}
	`}
`;

export const TableGrid = styled.div`
	display: grid;
	grid-template-columns: ${TABLE_GRID_COLUMNS};
	grid-template-rows: 73px;
	grid-auto-rows: 71px;
	width: fit-content;
	min-width: 100%;
`;

export const ColumnHeaders = styled.div`
	${({ theme }) => css`
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: ${TABLE_GRID_COLUMNS};
		align-items: center;
		padding: 0 18px;
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.sm};
		font-weight: ${theme.fontWeights.semibold};
		color: ${theme.colors.text.tableHeader};
	`}
`;

export const ProductColumnHeader = styled.div`
	display: contents;
`;

export const HeaderLabel = styled.span`
	grid-column: 2 / 4;
	display: flex;
	align-items: center;
`;

export const DetailsColumnHeaders = styled.div`
	display: contents;
`;

export const DetailsHeaderItem = styled.span`
	text-align: center;
`;

export const SortableHeader = styled.button<{ $align?: 'left' | 'center' }>`
	${({ $align = 'center' }) => css`
		display: flex;
		align-items: center;
		justify-content: ${$align === 'left' ? 'flex-start' : 'center'};
		gap: 4px;
		width: 100%;
		padding: 0;
		background: none;
		border: none;
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		cursor: pointer;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.8;
		}
	`}
`;

export const HeaderActionsSpacer = styled.div`
	width: 133px;
`;

export const ProductRows = styled.div`
	display: contents;
`;

export const ProductRowWrapper = styled.div<{
	$selected?: boolean;
	$clickable?: boolean;
}>`
	${({ theme, $selected, $clickable }) => css`
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: ${TABLE_GRID_COLUMNS};
		align-items: center;
		padding: 0 18px;
		border-top: 1px solid ${theme.colors.borderLight};
		border-bottom: 1px solid ${theme.colors.borderLight};
		position: relative;
		cursor: ${$clickable ? 'pointer' : 'default'};

		${$selected &&
		css`
			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				width: 3px;
				background-color: #3c538e;
			}
		`}
	`}
`;

export const ProductInfo = styled.div`
	display: contents;
`;

export const ProductImage = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.colors.borderGray};
	object-fit: cover;
	flex-shrink: 0;
`;

export const ProductImagePlaceholder = styled.div`
	${({ theme }) => css`
		width: 48px;
		height: 48px;
		border-radius: 8px;
		border: 1px solid ${theme.colors.borderGray};
		background-color: #c4c4c4;
		flex-shrink: 0;
	`}
`;

export const ProductNameBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	min-width: 0;
	padding-right: 10px;
`;

export const ProductName = styled.span`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.sm};
		font-weight: ${theme.fontWeights.semibold};
		color: ${theme.colors.text.black};
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	`}
`;

export const ProductCategory = styled.span`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.xs};
		font-weight: ${theme.fontWeights.regular};
		color: ${theme.colors.text.tableHeader};
	`}
`;

export const ProductDetails = styled.div`
	display: contents;
`;

export const DetailCell = styled.span<{ $bold?: boolean }>`
	${({ theme, $bold }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.sm};
		font-weight: ${$bold
			? theme.fontWeights.semibold
			: theme.fontWeights.regular};
		color: ${theme.colors.text.black};
		text-align: center;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	`}
`;

export const PriceCell = styled.span`
	${({ theme }) => css`
		font-family: 'Roboto Mono', monospace;
		font-size: ${theme.fontSizes.sm};
		font-weight: ${theme.fontWeights.regular};
		color: ${theme.colors.text.black};
		text-align: center;
		min-width: 0;

		.decimals {
			color: ${theme.colors.text.placeholder};
		}
	`}
`;

export const RatingCell = styled.span<{ $low?: boolean }>`
	${({ theme, $low }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.sm};
		font-weight: ${theme.fontWeights.regular};
		color: ${$low ? theme.colors.ratingLow : theme.colors.text.black};
		text-align: center;
		min-width: 0;
	`}
`;

export const RowActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 32px;
	min-width: 0;
`;

export const AddIconButton = styled.button`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 27px;
		padding: 4px;
		background-color: ${theme.colors.accent.primary};
		border: none;
		border-radius: 23px;
		cursor: pointer;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.9;
		}
	`}
`;

export const MenuButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 26px;
	height: 26px;
	background: none;
	border: 2px solid ${({ theme }) => theme.colors.text.secondary};
	border-radius: 50px;
	cursor: pointer;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 0.7;
	}
`;

export const PaginationFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 11px 0;
	width: 100%;

	${media.lessThan('sm')`
		flex-direction: column;
		gap: 20px;
	`}
`;

export const PaginationInfo = styled.p`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.md};
		font-weight: ${theme.fontWeights.regular};
		color: ${theme.colors.text.muted};
		margin: 0;

		span {
			color: ${theme.colors.text.primary};
		}
	`}
`;

export const PaginationControls = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

export const PaginationButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	background: none;
	border: none;
	cursor: pointer;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 0.7;
	}
`;

export const PaginationNumbers = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const PageNumber = styled.button<{ $active?: boolean }>`
	${({ theme, $active }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 4px;
		border: ${$active ? 'none' : `1px solid ${theme.colors.borderGray}`};
		background-color: ${$active
			? theme.colors.accent.pagination
			: theme.colors.white};
		color: ${$active ? theme.colors.white : theme.colors.text.tableHeader};
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.xs};
		font-weight: ${theme.fontWeights.regular};
		cursor: pointer;
		box-shadow: ${theme.shadows.pagination};
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.9;
		}
	`}
`;

export const LoadingMessage = styled.p`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.sm};
		color: ${theme.colors.text.tertiary};
		text-align: center;
		padding: 40px;
		margin: 0;
	`}
`;

export const ErrorMessage = styled.p`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.sm};
		color: ${theme.colors.error};
		text-align: center;
		padding: 40px;
		margin: 0;
	`}
`;
