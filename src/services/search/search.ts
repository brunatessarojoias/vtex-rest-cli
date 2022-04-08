import https from "https";
import api from "@app/config/api";
import parseParameters from "./utils/parseParameters";
import parseResources from "./utils/parseResources";
import type { SearchOptions } from "./searchTypes";

const API_ENDPOINT = "catalog_system/pub/products/search";

export default async function search(searchOptions?: SearchOptions) {
	console.log("searchOptions", searchOptions);

	try {
		const parsedSearchOptions = await parseParameters(searchOptions);

		const { headers, data } = await api(API_ENDPOINT, {
			...((parsedSearchOptions && {
				params: parsedSearchOptions,
			}) as unknown as object),
			httpsAgent: new https.Agent({ keepAlive: true }),
		});

		const isCachedResponse =
			headers["x-vtex-cache-status-janus-apicache"] === "HIT";

		const resources = parseResources(headers.resources);
		const hasMoreResults = resources.tail < resources.originTail;

		const result = {
			data,
			metadata: {
				isCachedResponse,
				hasMoreResults,
				resources,
			},
		};

		return result;
	} catch (err) {
		console.error(err);
	}
}
