import type { SearchOptions } from "./search.types";
import search from "./search";
import { API } from "@app/config/api/constants";

export default async function searchAll(
	searchOptions?: Partial<SearchOptions>
) {
	const initialRequest = await search(searchOptions);
	const { hasMoreResults, resources } = initialRequest.metadata;

	if (hasMoreResults) {
		const { tail: initialTail, originTail } = resources;
		let validatedOriginTail = originTail;

		if (validatedOriginTail > API.SEARCH_PAGINATION_THRESHOLD) {
			// TODO - Warn that it won't search for all possible results
			validatedOriginTail = API.SEARCH_PAGINATION_THRESHOLD;
		}

		const numberOfRequests = Math.ceil(
			(validatedOriginTail - initialTail) / initialTail
		);

		const promisesToBeSettled = new Array(numberOfRequests)
			.fill(null)
			.map((_, index) => {
				const requestIteration = index + 1;
				const paginationInterval =
					API.SEARCH_PAGINATION_MAX_INTERVAL - 1;

				const updatedFrom =
					requestIteration === 1
						? initialTail + 1
						: initialTail * requestIteration + requestIteration;

				const updatedTo = updatedFrom + paginationInterval;

				const updatedOptions = {
					...searchOptions,
					pagination: {
						from: updatedFrom,
						to:
							updatedTo > validatedOriginTail
								? validatedOriginTail
								: updatedTo,
					},
				};

				return () => search(updatedOptions);
			});

		const settledPromises = await Promise.allSettled(
			promisesToBeSettled.map(func => func())
		);

		const results = settledPromises
			.filter(promiseResult => promiseResult.status === "fulfilled")
			.map(
				promiseResult =>
					/*
					 * Check for 'fulfilled' after calling
					 * 'Array.prototype.filter' because
					 * TypeScript does not know about it.
					 */
					promiseResult.status === "fulfilled" &&
					promiseResult.value.data
			)
			.flat();

		return [...initialRequest.data, ...results];
	}

	return initialRequest.data;
}
