import { searchOptionsSchema } from "./validationSchemas";
import type { SearchOptions } from "../../types/search";

// TODO - Handle Joi errors
export default function validateInputSchema(
	inputParameters?: Partial<SearchOptions>
): SearchOptions {
	const validationOptions = {
		convert: true,
		stripUnknown: true,
	};

	const { value: validatedParameters, error } = searchOptionsSchema.validate(
		inputParameters,
		validationOptions
	);

	if (error) {
		throw new TypeError(error.message);
	}

	return validatedParameters;
}
