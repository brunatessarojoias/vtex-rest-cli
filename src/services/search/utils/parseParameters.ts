import { searchOptionsSchema } from "./validationSchemas";
import type { SearchOptions } from "../searchTypes";

// TODO - Transform validated searchOptions values to VTEX api params keys
export default async function parseParameters(parameters?: SearchOptions) {
	const validatedParameters = await searchOptionsSchema.validate(parameters);

	return validatedParameters;
}
