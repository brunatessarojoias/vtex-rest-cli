import { array, boolean, lazy, number, object, string, tuple } from "yup";
import { API } from "@app/config/api/constants";

export const searchFiltersSchema = object({
	brand: string(),
	category: number(),
	collectionId: number(),
	ean: string(),
	fullText: string(),
	priceRange: object({
		from: number().optional(),
		to: number().notRequired(),
	}).notRequired(),
	productId: number(),
	referenceId: number(),
	salesChannel: array().of(
		tuple([
			number().label("salesChannelId"),
			boolean().label("salesChannelIdEnabled"),
		])
	),
	seller: number(),
	skuId: number(),
	specification: array().of(
		tuple([
			number().label("specificationId"),
			string().label("specificationValue"),
		])
	),
});

// prettier-ignore
export const sortAscendingSchema = string()
	.matches(/^ASC$/i)
	.uppercase();

export const sortDescendingSchema = string()
	.matches(/^DESC$/i)
	.uppercase();

export const sortingOrderSchema = lazy((value: string) => {
	if (/^a/i.test(value)) return sortAscendingSchema;

	return sortDescendingSchema;
});

export const searchSortingSchema = object({
	bestDiscounts: sortDescendingSchema,
	bestReviews: sortDescendingSchema,
	name: sortingOrderSchema,
	price: sortingOrderSchema,
	releaseDate: sortDescendingSchema,
	score: sortDescendingSchema,
	topSelling: sortDescendingSchema,
});

export const searchPaginationSchema = object({
	from: number()
		.label("Search pagination 'from'")
		.max(API.SEARCH_PAGINATION_THRESHOLD)
		.default(0),
	to: number()
		.label("Search pagination 'to'")
		.max(API.SEARCH_PAGINATION_THRESHOLD)
		.default(49),
}).transformKeys(key => `_${key}`);

export const searchOptionsSchema = object({
	pagination: searchPaginationSchema,
	filters: searchFiltersSchema,
	sorting: searchSortingSchema,
});
