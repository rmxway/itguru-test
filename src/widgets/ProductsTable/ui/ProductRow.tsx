import { useState } from 'react';
import type { Product } from '@shared/api/products';
import { Checkbox } from '@shared/ui';
import { PlusIcon, DotsIcon } from '@shared/assets/icons';
import {
	ProductRowWrapper,
	ProductInfo,
	ProductImageContainer,
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

function ProductImageWithPlaceholder({
	src,
	alt,
}: {
	src: string;
	alt: string;
}) {
	const [loaded, setLoaded] = useState(false);
	return (
		<ProductImageContainer>
			<ProductImagePlaceholder $visible={!loaded} />
			<ProductImage
				src={src}
				alt={alt}
				$loaded={loaded}
				onLoad={() => setLoaded(true)}
			/>
		</ProductImageContainer>
	);
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
				<ProductImageWithPlaceholder
					key={product.thumbnail}
					src={product.thumbnail}
					alt={product.title}
				/>
				<ProductNameBlock>
					<ProductName>{product.title}</ProductName>
					<ProductCategory>{product.category}</ProductCategory>
				</ProductNameBlock>
			</ProductInfo>
			<ProductDetails>
				<DetailCell $bold>{product.brand || '–'}</DetailCell>
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
