import type { SearchOptions } from "../../searchTypes";
import parseInputParameters from "./parseInputParameters";

// TODO - Map 'validatedParameters' to valid VTEX query params
export default function buildQueryParams(inputParameters?: SearchOptions) {
	const validatedParameters = parseInputParameters(inputParameters);

	return validatedParameters;
}
