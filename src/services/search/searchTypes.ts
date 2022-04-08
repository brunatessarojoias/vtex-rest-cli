export interface SearchOptions {
	filters?: SearchFilters;
	sorting?: SearchSorting;
	pagination?: SearchPagination;
}

export interface SearchFilters {
	brand?: string;
	category?: number;
	collectionId?: number;
	ean?: string;
	fullText?: string;
	priceRange?: {
		from: number;
		to: number;
	};
	productId?: number;
	referenceId?: number;
	salesChannel?: Array<[number, boolean]>;
	seller?: number;
	skuId?: number;
	specification?: Array<[number, string]>;
}

export interface SearchSorting {
	bestDiscounts?: string;
	bestReviews?: string;
	name?: string;
	price?: string;
	releaseDate?: string;
	score?: string;
	topSelling?: string;
}

export interface SearchPagination {
	from?: number;
	to?: number;
}
