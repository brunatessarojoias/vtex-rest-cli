import Joi from "joi";
import { API } from "@app/config/api/constants";

export const searchFiltersSchema = Joi.object({
	brandId: Joi.number().integer(),
	categoryId: Joi.object({
		department: Joi.number().integer().required(),
		category: Joi.number().integer(),
		subcategory: Joi.number().integer(),
	}),
	collectionId: Joi.number().integer(),
	ean: Joi.string(),
	fullText: Joi.string(),
	priceRange: Joi.object({
		from: Joi.number().integer(),
		to: Joi.number().integer(),
	}),
	productId: Joi.number().integer(),
	referenceId: Joi.number().integer(),
	salesChannels: Joi.array().items(
		Joi.object({
			id: Joi.number().integer(),
			available: Joi.boolean().cast("number"),
		})
	),
	sellerId: Joi.number().integer(),
	skuId: Joi.number().integer(),
	specifications: Joi.array().items(
		Joi.object({
			id: Joi.number().integer(),
			value: Joi.alternatives().try(Joi.string(), Joi.number().integer()),
		})
	),
});

export const sortAscendingSchema = Joi.string()
	.pattern(/^ASC$/i)
	.uppercase()
	.example("asc, ASC");

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

/*
 * // TODO* Add validation for 'to' key, if its value
 * // is less than 'from', replace its value with 'from
 */
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
}).default();

export const searchOptionsSchema = Joi.object({
	filters: searchFiltersSchema,
	sorting: searchSortingSchema,
	pagination: searchPaginationSchema,
}).default();
