interface ParsedResources {
	head: number;
	tail: number;
	originTail: number;
}

export default function parseResources(
	resourcesHeader: string
): ParsedResources {
	const [head, tail, origin] = resourcesHeader.split(/[-,/]+/);

	const originAsNumber = parseInt(origin);

	const parsedResources = {
		head: parseInt(head),
		tail: parseInt(tail),
		//! Subtract 1 from 'originAsNumber' because 'tail' is a zero-based
		//! index and 'originAsNumber' is the quantity of products
		originTail: originAsNumber <= 0 ? 0 : originAsNumber - 1,
	};

	return parsedResources;
}
