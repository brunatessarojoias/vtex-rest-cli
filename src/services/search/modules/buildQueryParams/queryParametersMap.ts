import {
	SearchFilters,
	SearchPagination,
	SearchSorting,
} from "../../searchTypes";

enum QueryParameter {
	Default = "fq",
	FullText = "ft",
	Ordination = "O",
	PaginationFrom = "_from",
	PaginationTo = "_to",
}

type QueryParameterOptions = {
	parameter: QueryParameter;
	interpolation?: {
		[interpolationVariable: string]: string;
	};
	value?: string;
};

type QueryParametersMap = {
	filters: {
		[searchOptionKey in keyof Required<SearchFilters>]: QueryParameterOptions;
	};
	sorting: {
		[searchOptionKey in keyof Required<SearchSorting>]: QueryParameterOptions;
	};
	pagination: {
		[searchOptionKey in keyof Required<SearchPagination>]: QueryParameterOptions;
	};
};

export const queryParametersMap: QueryParametersMap = {
	filters: {
		brandId: {
			parameter: QueryParameter.Default,
			value: "B:/",
		},
		categoryId: {
			parameter: QueryParameter.Default,
			value: "C:/",
		},
		collectionId: {
			parameter: QueryParameter.Default,
			value: "productClusterIds:",
		},
		ean: {
			parameter: QueryParameter.Default,
			value: "alternateIds_Ean:",
		},
		fullText: {
			parameter: QueryParameter.FullText,
		},
		priceRange: {
			parameter: QueryParameter.Default,
			interpolation: {
				from: "a",
				to: "b",
			},
			value: "P:[{a} TO {b}]",
		},
		productId: {
			parameter: QueryParameter.Default,
			value: "productId:",
		},
		referenceId: {
			parameter: QueryParameter.Default,
			value: "alternateIds_RefId:",
		},
		salesChannelIds: {
			parameter: QueryParameter.Default,
			interpolation: {
				key: "a",
				value: "b",
			},
			value: "isAvailablePerSalesChannel_{a}:{b}",
		},
		sellerId: {
			parameter: QueryParameter.Default,
			value: "sellerId:",
		},
		skuId: {
			parameter: QueryParameter.Default,
			value: "skuId:",
		},
		specifications: {
			parameter: QueryParameter.Default,
			interpolation: {
				key: "a",
				value: "b",
			},
			value: "specificationFilter_{a}:{b}",
		},
	},
	sorting: {
		bestDiscounts: {
			parameter: QueryParameter.Ordination,
			value: "OrderByBestDiscount",
		},
		bestReviews: {
			parameter: QueryParameter.Ordination,
			value: "OrderByReviewRate",
		},
		name: {
			parameter: QueryParameter.Ordination,
			value: "OrderByName",
		},
		price: {
			parameter: QueryParameter.Ordination,
			value: "OrderByPrice",
		},
		releaseDate: {
			parameter: QueryParameter.Ordination,
			value: "OrderByReleaseDate",
		},
		score: {
			parameter: QueryParameter.Ordination,
			value: "OrderByScore",
		},
		topSelling: {
			parameter: QueryParameter.Ordination,
			value: "OrderByTopSale",
		},
	},
	pagination: {
		from: {
			parameter: QueryParameter.PaginationFrom,
		},
		to: {
			parameter: QueryParameter.PaginationTo,
		},
	},
};
