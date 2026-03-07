export interface Product {
	id: number | string;
	title: string;
	category: string;
	brand: string;
	price: number;
	rating: number;
	thumbnail: string;
	sku?: string;
}

export interface ProductsResponse {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
}
