interface ParsedResources {
	head: number;
	tail: number;
	originTail: number;
}

export default function parseResources(
	resourcesHeader: string
): ParsedResources {
	const [head, tail, origin] = resourcesHeader.split(/[-,/]+/);

	const parsedResources = {
		head: parseInt(head),
		tail: parseInt(tail),
		//! Subtract 1 from 'origin' because 'tail' is a zero-based index and
		//! 'origin' is the quantity of products
		originTail: parseInt(origin) - 1,
	};

	return parsedResources;
}
