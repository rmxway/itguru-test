import type { Product } from '@shared/api/products';
import { Checkbox } from '@shared/ui';
import { PlusIcon, DotsIcon } from '@shared/assets/icons';
import {
	ProductRowWrapper,
	ProductInfo,
	ProductImage,
	ProductImagePlaceholder,
	ProductNameBlock,
	ProductName,
	ProductCategory,
	ProductDetails,
	DetailCell,
	PriceCell,
	RatingCell,
	RowActions,
	AddIconButton,
	MenuButton,
} from './styled';

interface ProductRowProps {
	product: Product;
	selected?: boolean;
	onSelectChange?: () => void;
}

function formatPrice(price: number): { int: string; dec: string } {
	const [intPart, decPart] = price.toFixed(2).split('.');
	const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	return { int: formatted, dec: `,${decPart}` };
}

export function ProductRow({
	product,
	selected = false,
	onSelectChange,
}: ProductRowProps) {
	const sku = product.sku ?? `SKU-${product.id}`;
	const ratingLow = product.rating < 4;
	const price = formatPrice(product.price);

	return (
		<ProductRowWrapper
			$selected={selected}
			$clickable={Boolean(onSelectChange)}
			onClick={onSelectChange}
		>
			<ProductInfo>
				<span onClick={(e) => e.stopPropagation()}>
					<Checkbox
						checked={selected}
						onChange={() => onSelectChange?.()}
						aria-label={`Выбрать ${product.title}`}
					/>
				</span>
				{product.thumbnail ? (
					<ProductImage src={product.thumbnail} alt={product.title} />
				) : (
					<ProductImagePlaceholder />
				)}
				<ProductNameBlock>
					<ProductName>{product.title}</ProductName>
					<ProductCategory>{product.category}</ProductCategory>
				</ProductNameBlock>
			</ProductInfo>
			<ProductDetails>
				<DetailCell $bold>{product.brand}</DetailCell>
				<DetailCell>{sku}</DetailCell>
				<RatingCell $low={ratingLow}>
					{product.rating.toFixed(1)}/5
				</RatingCell>
				<PriceCell>
					{price.int}
					<span className="decimals">{price.dec}</span>
				</PriceCell>
				<RowActions onClick={(e) => e.stopPropagation()}>
					<AddIconButton type="button" aria-label="Добавить">
						<PlusIcon size={24} color="white" />
					</AddIconButton>
					<MenuButton type="button" aria-label="Меню">
						<DotsIcon size={24} color="text.secondary" />
					</MenuButton>
				</RowActions>
			</ProductDetails>
		</ProductRowWrapper>
	);
}
