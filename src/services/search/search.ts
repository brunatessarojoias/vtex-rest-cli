import https from "https";
import api from "@app/config/api";
import buildQueryParams from "./modules/buildQueryParams";
import parseResources from "./utils/parseResources";
import type { SearchOptions, SearchResult } from "./search.types";

const API_ENDPOINT = "catalog_system/pub/products/search";

export default async function search(
	searchOptions?: Partial<SearchOptions>
): Promise<SearchResult> {
	try {
		/*
		 ! Don't check for undefined 'searchOptions' because
		 ! 'buildQueryParams' returns default values
		 */
		const queryParams = buildQueryParams(searchOptions);

		const apiHeaders = {
			params: queryParams,
			httpsAgent: new https.Agent({ keepAlive: true }),
		};

		const { headers, data } = await api(API_ENDPOINT, apiHeaders);

		const resources = parseResources(headers.resources);
		const hasMoreResults = resources.tail < resources.originTail;

		const result = {
			data,
			metadata: {
				resources,
				hasMoreResults,
			},
		};

		return result;
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
