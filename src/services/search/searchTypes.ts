export interface SearchFilters {
	brand: string;
	category: string;
	collectionId: number;
	ean: string;
	fullText: string;
	priceRange: {
		from: number;
		to: number;
	};
	productId: number;
	referenceId: number;
	salesChannel: Record<number, boolean>;
	seller: number;
	skuId: number;
	specification: {
		id: number;
		value: string;
	};
}

export interface SearchPagination {
	from: number;
	to: number;
}

type SortAscending = "ASC";
type SortDescending = "DESC";
type SortingOrder = SortAscending | SortDescending;

export interface SearchSorting {
	bestDiscounts: SortDescending;
	bestReviews: SortDescending;
	name: SortingOrder;
	price: SortingOrder;
	releaseDate: SortDescending;
	score: SortDescending;
	topSelling: SortDescending;
}
