import api from "@config/api";
import debugSimilarCategory from "./utils/debug";
import randomId from "@services/common/utils/randomId";
import type { AxiosRequestConfig } from "axios";
import type { SimilarProductCategoryDelete } from "./types";

const debug = debugSimilarCategory.extend("deleteSimilarProductCategory");

const BASE_API_ENDPOINT = "catalog/pvt/product";

const getApiEndpoint = ({
	productId,
	categoryId,
}: SimilarProductCategoryDelete) =>
	`${BASE_API_ENDPOINT}/${productId}/similarcategory/${categoryId}`;

export default async function deleteSimilarProductCategory({
	productId,
	categoryId,
}: SimilarProductCategoryDelete) {
	try {
		const requestId = randomId();

		debug(
			`Requesting DELETION of similar category id:${categoryId} for productId:${productId}... (id: ${requestId})`
		);

		const apiHeaders: AxiosRequestConfig = {
			method: "DELETE",
		};
		const apiEndpoint = getApiEndpoint({ productId, categoryId });
		const { status, statusText } = await api(apiEndpoint, apiHeaders);

		debug(`Request successful. (id: ${requestId})`);

		return {
			data: {
				productId,
				deletedCategoryId: categoryId,
			},
			metadata: {
				status,
				statusText,
			},
		};
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
