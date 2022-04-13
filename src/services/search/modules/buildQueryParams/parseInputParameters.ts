import { searchOptionsSchema } from "./validationSchemas";
import type { SearchOptions } from "../../searchTypes";

// TODO - Handle Joi errors
export default function parseInputParameters(inputParameters?: SearchOptions) {
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
