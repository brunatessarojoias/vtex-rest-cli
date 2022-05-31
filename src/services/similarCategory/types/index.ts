export type SimilarProductCategories = {
	productId: string;
	categoriesIds: string[];
};

export type SimilarProductCategoryDelete = {
	productId: string;
	categoryId: string;
};

export type ApiGetData = Array<ApiGetDataItem>;

export type ApiGetDataItem = {
	ProductId: string;
	CategoryId: string;
};
