import https from "https";
import api from "@app/config/api";
import buildQueryParams from "./modules/buildQueryParams";
import parseResources from "./utils/parseResources";
import type { SearchOptions, SearchResult } from "./types/search";
import debug from "./utils/debug";
import randomId from "@services/common/utils/randomId";

const API_ENDPOINT = "catalog_system/pub/products/search";

export default async function search(
	searchOptions?: Partial<SearchOptions>,
	inputRequestId?: string
): Promise<SearchResult> {
	try {
		const requestId = inputRequestId ? inputRequestId : randomId();

		/*
		 ! Don't check for undefined 'searchOptions' because
		 ! 'buildQueryParams' returns default values
		 */
		const queryParams = buildQueryParams(searchOptions);

		debug(
			`Preparing request, parameters: %O (id: ${requestId})`,
			queryParams
		);

		const apiHeaders = {
			params: queryParams,
			httpsAgent: new https.Agent({ keepAlive: true }),
		};

		debug(`Searching... (id: ${requestId})`);

		const { headers, data } = await api(API_ENDPOINT, apiHeaders);

		debug(`Search done, data length: ${data.length} (id: ${requestId})`);

		const resources = parseResources(headers.resources);
		const hasMoreResults = resources.tail < resources.originTail;

		const result: SearchResult = {
			data,
			metadata: {
				resources,
				hasMoreResults,
				requestId,
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
