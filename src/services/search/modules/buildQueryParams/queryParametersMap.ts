import { SearchOptions } from "../../search.types";

export enum QueryParameters {
	Default = "fq",
	FullText = "ft",
	Ordination = "O",
	PaginationFrom = "_from",
	PaginationTo = "_to",
}

export type QueryParameterOptions = {
	parameter: QueryParameters;
	template?: string;
	interpolateValues?: boolean;
	optionalVariables?: Array<string>;
	variableDivider?: string;
};

export type SearchOptionTypeKey<T> = {
	[key in keyof Required<T>]: QueryParameterOptions;
};

export type QueryParametersMap = {
	[searchOptionType in keyof Required<SearchOptions>]: SearchOptionTypeKey<
		SearchOptions[searchOptionType]
	>;
};

export const queryParametersMap: QueryParametersMap = {
	filters: {
		brandId: {
			parameter: QueryParameters.Default,
			template: "B:",
		},
		categoryId: {
			parameter: QueryParameters.Default,
			template: "C:/{department}/{category}/{subcategory}/",
			interpolateValues: true,
			optionalVariables: ["category", "subcategory"],
			variableDivider: "/",
		},
		collectionId: {
			parameter: QueryParameters.Default,
			template: "productClusterIds:",
		},
		ean: {
			parameter: QueryParameters.Default,
			template: "alternateIds_Ean:",
		},
		fullText: {
			parameter: QueryParameters.FullText,
		},
		priceRange: {
			parameter: QueryParameters.Default,
			template: "P:[{from} TO {to}]",
			interpolateValues: true,
		},
		productId: {
			parameter: QueryParameters.Default,
			template: "productId:",
		},
		referenceId: {
			parameter: QueryParameters.Default,
			template: "alternateIds_RefId:",
		},
		salesChannels: {
			parameter: QueryParameters.Default,
			template: "isAvailablePerSalesChannel_{id}:{available}",
			interpolateValues: true,
		},
		sellerId: {
			parameter: QueryParameters.Default,
			template: "sellerId:",
		},
		skuId: {
			parameter: QueryParameters.Default,
			template: "skuId:",
		},
		specifications: {
			parameter: QueryParameters.Default,
			template: "specificationFilter_{id}:{value}",
			interpolateValues: true,
		},
	},
	sorting: {
		bestDiscounts: {
			parameter: QueryParameters.Ordination,
			template: "OrderByBestDiscount",
		},
		bestReviews: {
			parameter: QueryParameters.Ordination,
			template: "OrderByReviewRate",
		},
		name: {
			parameter: QueryParameters.Ordination,
			template: "OrderByName",
		},
		price: {
			parameter: QueryParameters.Ordination,
			template: "OrderByPrice",
		},
		releaseDate: {
			parameter: QueryParameters.Ordination,
			template: "OrderByReleaseDate",
		},
		score: {
			parameter: QueryParameters.Ordination,
			template: "OrderByScore",
		},
		topSelling: {
			parameter: QueryParameters.Ordination,
			template: "OrderByTopSale",
		},
	},
	pagination: {
		from: {
			parameter: QueryParameters.PaginationFrom,
		},
		to: {
			parameter: QueryParameters.PaginationTo,
		},
	},
};
