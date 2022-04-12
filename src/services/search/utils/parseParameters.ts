import Joi from "joi";
import { searchOptionsSchema } from "./validationSchemas";
import type { SearchOptions } from "../searchTypes";

// TODO - Transform validated searchOptions values to VTEX api params keys
export default function parseParameters(parameters?: SearchOptions) {
	const validationOptions = {
		convert: true,
		stripUnknown: true,
	};

	const validatedParameters = Joi.attempt(
		parameters,
		searchOptionsSchema,
		validationOptions
	);

	return validatedParameters;
}
