import Joi from "joi";
import { API } from "@app/config/api/constants";

export const searchFiltersSchema = Joi.object({
	brand: Joi.string(),
	category: Joi.number().integer(),
	collectionId: Joi.number().integer(),
	ean: Joi.string(),
	fullText: Joi.string(),
	priceRange: Joi.object({
		from: Joi.number().integer(),
		to: Joi.number().integer(),
	}),
	productId: Joi.number().integer(),
	referenceId: Joi.number().integer(),
	salesChannel: Joi.array().items(
		Joi.array()
			.length(2)
			.ordered(
				Joi.number().integer().label("salesChannelId"),
				Joi.boolean().label("salesChannelIdEnabled")
			)
	),
	seller: Joi.number().integer(),
	skuId: Joi.number().integer(),
	specification: Joi.array().items(
		Joi.array()
			.length(2)
			.ordered(
				Joi.number().integer().label("specificationId"),
				Joi.string().label("specificationValue")
			)
	),
});

// prettier-ignore
export const sortAscendingSchema = Joi.string()
	.pattern(/^ASC$/i)
	.uppercase()
	.example('asc, ASC')

export const sortDescendingSchema = Joi.string()
	.pattern(/^DESC$/i)
	.uppercase()
	.example("desc, DESC");

export const sortingOrderSchema = Joi.alternatives()
	.try(sortAscendingSchema, sortDescendingSchema)
	.match("one")
	.example("asc/ASC, desc/DESC");

export const searchSortingSchema = Joi.object({
	bestDiscounts: sortDescendingSchema,
	bestReviews: sortDescendingSchema,
	name: sortingOrderSchema,
	price: sortingOrderSchema,
	releaseDate: sortDescendingSchema,
	score: sortDescendingSchema,
	topSelling: sortDescendingSchema,
});

export const searchPaginationSchema = Joi.object({
	from: Joi.number()
		.integer()
		.min(0)
		.max(API.SEARCH_PAGINATION_THRESHOLD)
		.default(0),
	to: Joi.number()
		.integer()
		.min(0)
		.max(API.SEARCH_PAGINATION_THRESHOLD)
		.default(49),
});

export const searchOptionsSchema = Joi.object({
	pagination: searchPaginationSchema,
	filters: searchFiltersSchema,
	sorting: searchSortingSchema,
});
