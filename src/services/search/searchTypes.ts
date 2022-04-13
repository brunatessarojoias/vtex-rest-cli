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

type SortAscending = "asc" | "ASC";
type SortDescending = "desc" | "DESC";
type SortingOrder = SortAscending | SortDescending;

export interface SearchSorting {
	bestDiscounts?: SortDescending;
	bestReviews?: SortDescending;
	name?: SortingOrder;
	price?: SortingOrder;
	releaseDate?: SortDescending;
	score?: SortDescending;
	topSelling?: SortDescending;
}

export interface SearchPagination {
	from?: number;
	to?: number;
}
