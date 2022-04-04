import api from "@app/config/api";
import { API } from "@app/config/api/constants";
import parseResources from "./utils/parseResources";

const API_ENDPOINT = "catalog_system/pub/products/search";

export default async function search(from = 0, to = 49) {
	try {
		const requestParameters = {
			_from: from,
			_to: to < from ? from : to,
		};

		if (requestParameters._from >= API.SEARCH_PAGINATION_THRESHOLD) {
			throw new RangeError(
				"Request parameter '_from' can't be greater than 2500."
			);
		}

		const { headers, data } = await api(API_ENDPOINT, {
			params: requestParameters,
		});

		const isCachedResponse =
			headers["x-vtex-cache-status-janus-apicache"] === "HIT"
				? true
				: false;

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
