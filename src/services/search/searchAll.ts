import type { SearchOptions, SearchResult } from "./types";
import search from "./search";
import { API } from "@app/config/api/constants";
import debugSearch from "./utils/debug";
import randomId from "@services/common/utils/randomId";

const debug = debugSearch.extend("searchAll");

export default async function searchAll(
	searchOptions?: Partial<SearchOptions>
) {
	const initialRequestId = randomId();
	const getDebugMessage = (dataLength: number) =>
		`Requests done. Aggregate data length: ${dataLength}`;

	debug(
		`Making initial request to get origin tail...(id: ${initialRequestId})`
	);

	const initialRequest = await search(searchOptions, initialRequestId);
	const {
		hasMoreResults,
		resources: { tail: initialRequestTail, originTail },
	} = initialRequest.metadata;
	const isOriginTailGreaterThanThreshold =
		originTail > API.SEARCH_PAGINATION_THRESHOLD;

	if (!hasMoreResults) {
		debug(getDebugMessage(initialRequest.data.length));

		return initialRequest.data;
	}

	debug("Origin has more results. Generating next requests...");

	if (isOriginTailGreaterThanThreshold)
		//* Add 1 to 'originTail' and 'API.SEARCH_PAGINATION_THRESHOLD'
		//* because they are Zero-based indexes
		debug(
			`Origin has ${
				originTail + 1
			} possible results, but the API pagination is limited to ${
				API.SEARCH_PAGINATION_THRESHOLD + 1
			} results, you can tweak the search filters to get all results.`
		);

	const paginationCeil = isOriginTailGreaterThanThreshold
		? API.SEARCH_PAGINATION_THRESHOLD
		: originTail;
	const initialPaginationInterval = API.SEARCH_PAGINATION_MAX_INTERVAL - 1;
	const promisesToBeSettled = [];

	const getPaginationInterval = (previousPagination: number) => {
		const maybeNextPagination =
			previousPagination + initialPaginationInterval;
		const isGreaterThanCeil = maybeNextPagination > paginationCeil;

		if (isGreaterThanCeil) return paginationCeil - previousPagination;

		return initialPaginationInterval;
	};

	for (
		let paginationFrom = initialRequestTail;
		paginationFrom <= paginationCeil;
		paginationFrom = paginationFrom + 1 + initialPaginationInterval
	) {
		const nextPaginationFrom = paginationFrom + 1;
		const nextSearchOptions = {
			...searchOptions,
			pagination: {
				from: nextPaginationFrom,
				to:
					nextPaginationFrom +
					getPaginationInterval(nextPaginationFrom),
			},
		};
		const unexecutedPromise = () => search(nextSearchOptions);

		promisesToBeSettled.push(unexecutedPromise);
	}

	const settledPromises = await Promise.allSettled(
		promisesToBeSettled.map(func => func())
	);
	const results = settledPromises
		.filter(promiseResult => promiseResult.status === "fulfilled")
		.map(
			promiseResult =>
				(promiseResult as PromiseFulfilledResult<SearchResult>).value
					.data
		)
		.flat();
	const aggregateResult = [...initialRequest.data, ...results];

	debug(getDebugMessage(aggregateResult.length));

	return aggregateResult;
}
