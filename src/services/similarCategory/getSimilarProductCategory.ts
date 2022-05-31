import api from "@config/api";
import debugSimilarCategory from "./utils/debug";
import randomId from "@services/common/utils/randomId";
import type { ApiGetData, SimilarProductCategories } from "./types";

const debug = debugSimilarCategory.extend("getSimilarProductCategory");

const BASE_API_ENDPOINT = "catalog/pvt/product";

const getApiEndpoint = (productId: string) =>
	`${BASE_API_ENDPOINT}/${productId}/similarcategory`;

export default async function getSimilarProductCategory(productId: string) {
	try {
		const requestId = randomId();

		debug(
			`Requesting data for productId: ${productId}... (id: ${requestId})`
		);

		const apiEndpoint = getApiEndpoint(productId);
		const { data } = await api(apiEndpoint);

		debug(`Request successful. (id: ${requestId})`);

		const mappedData = (data as ApiGetData).reduce(
			(similarCategories, entry) => {
				similarCategories.categoriesIds.push(entry?.CategoryId);

				return similarCategories;
			},
			{
				productId: productId,
				categoriesIds: [],
			} as SimilarProductCategories
		);

		return mappedData;
	} catch (err) {
		// TODO - Handle Axios and VTEX errors
		console.error(err);

		/*
		 ? Temporary fix:
		 ? throw 'err' after catch to prevent undefined return
		 */
		throw err;
	}
}
