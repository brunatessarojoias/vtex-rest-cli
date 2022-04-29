import type { ParsedResources } from "./utils/parseResources";

// TODO? - Generate typings dynamically from Joi schemas

export type SearchOptions = {
	[type: string]: SearchFilters | SearchSorting | SearchPagination;
	filters: SearchFilters;
	sorting: SearchSorting;
	pagination: SearchPagination;
};

type CommonSearchOptionsValues = string | number | boolean;

export type CommonSearchOptionsValuesAsObject = {
	[id: string]: CommonSearchOptionsValues;
};

export type CommonSearchOptionsValuesAsArray =
	Array<CommonSearchOptionsValuesAsObject>;

export type ValidSearchOptionsValues =
	| CommonSearchOptionsValues
	| CommonSearchOptionsValuesAsObject
	| CommonSearchOptionsValuesAsArray;

type SearchOptionTypeBase = {
	[id: string]: ValidSearchOptionsValues;
};

export type SearchFilters = SearchOptionTypeBase & {
	brandId?: number;
	categoryId?: {
		department: number;
		category?: number;
		subcategory?: number;
	};
	collectionId?: number;
	ean?: string;
	fullText?: string;
	priceRange?: {
		[param: string]: number;
		from: number;
		to: number;
	};
	productId?: number;
	referenceId?: number;
	salesChannels?: Array<{
		id: number;
		available: boolean;
	}>;
	sellerId?: number;
	skuId?: number;
	specifications?: Array<{
		id: number;
		value: string | number;
	}>;
};

type SortAscending = "asc" | "ASC";
type SortDescending = "desc" | "DESC";
type SortingOrder = SortAscending | SortDescending;

export type SearchSorting = SearchOptionTypeBase & {
	bestDiscounts?: SortDescending;
	bestReviews?: SortDescending;
	name?: SortingOrder;
	price?: SortingOrder;
	releaseDate?: SortDescending;
	score?: SortDescending;
	topSelling?: SortDescending;
};

export type SearchPagination = SearchOptionTypeBase & {
	from?: number;
	to?: number;
};

// TODO - Type 'data' values (VTEX Catalog's product)
export type SearchResult = {
	data: unknown[];
	metadata: {
		hasMoreResults: boolean;
		resources: ParsedResources;
		requestId: string;
	};
};
