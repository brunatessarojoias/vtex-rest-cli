export const queryParametersMap = {
	filters: {
		brandId: {
			parameter: "fq",
			value: "B:/",
		},
		categoryId: {
			paramater: "fq",
			value: "C:/",
		},
		collectionId: {
			parameter: "fq",
			value: "productClusterIds:",
		},
		ean: {
			parameter: "fq",
			value: "alternateIds_Ean:",
		},
		fullText: {
			parameter: "ft",
		},
		priceRange: {
			parameter: "fq",
			interpolation: {
				from: "a",
				to: "b",
			},
			value: "P:[{a} TO {b}]",
		},
		productId: {
			parameter: "fq",
			value: "productId:",
		},
		referenceId: {
			parameter: "fq",
			value: "alternateIds_RefId:",
		},
		salesChannel: {
			parameter: "",
			interpolation: {
				key: "a",
				value: "b",
			},
			value: "isAvailablePerSalesChannel_{a}:{b}",
		},
		seller: {
			parameter: "fq",
			value: "sellerId:",
		},
		skuId: {
			parameter: "fq",
			value: "skuId:",
		},
		specification: {
			parameter: "fq",
			interpolation: {
				key: "a",
				value: "b",
			},
			value: "specificationFilter_{a}:{b}",
		},
	},
	sorting: {
		bestDiscounts: {
			parameter: "O",
			value: "OrderByBestDiscount",
		},
		bestReviews: {
			parameter: "O",
			value: "OrderByReviewRate",
		},
		name: {
			parameter: "O",
			value: "OrderByName",
		},
		price: {
			parameter: "O",
			value: "OrderByPrice",
		},
		releaseDate: {
			parameter: "O",
			value: "OrderByReleaseDate",
		},
		score: {
			parameter: "O",
			value: "OrderByScore",
		},
		topSelling: {
			parameter: "O",
			value: "OrderByTopSale",
		},
	},
	pagination: {
		from: {
			parameter: "_from",
		},
		to: {
			parameter: "_to",
		},
	},
};
