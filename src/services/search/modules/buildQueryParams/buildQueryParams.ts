import type {
	SearchOptions,
	CommonSearchOptionsValuesAsObject,
	ValidSearchOptionsValues,
} from "../../types/search";
import type { QueryParameters } from "./queryParametersMap";
import validateInputSchema from "./validateInputSchema";
import { queryParametersMap } from "./queryParametersMap";
import applyVariablesInterpolation from "../../utils/applyVariablesInterpolation";

type QueryParams = Record<QueryParameters, Array<string>>;

export default function buildQueryParams(
	inputParameters?: Partial<SearchOptions>
) {
	const validatedParameters = validateInputSchema(inputParameters);

	const queryParams = Object.entries(validatedParameters).reduce(
		(temporaryQueryParams, searchOptionTypesAsKeyAndValue) => {
			const [searchOptionTypeKey, searchOptionTypeValue] =
				searchOptionTypesAsKeyAndValue;

			Object.entries(searchOptionTypeValue).forEach(
				([optionName, optionValue]) => {
					const { parameter } =
						queryParametersMap[searchOptionTypeKey][optionName];

					temporaryQueryParams[parameter] =
						temporaryQueryParams[parameter] || [];

					const addParameterValue = (paramValue: string) => {
						temporaryQueryParams[parameter]?.push(paramValue);
					};

					const {
						template,
						interpolateValues,
						optionalVariables,
						variableDivider,
					} = queryParametersMap[searchOptionTypeKey][optionName];

					const paramMapHasTemplate = !!template;

					const convertOptionToQueryParam = (
						value: ValidSearchOptionsValues
					) => {
						if (!paramMapHasTemplate)
							return addParameterValue(`${value}`);

						if (paramMapHasTemplate && !interpolateValues)
							return addParameterValue(`${template}${value}`);

						const interpolatedValue = applyVariablesInterpolation({
							inputString: template as string,
							interpolationValues:
								value as CommonSearchOptionsValuesAsObject,
							optionalVariables,
							variableDivider,
						});

						return addParameterValue(interpolatedValue);
					};

					if (Array.isArray(optionValue)) {
						return optionValue.forEach(value =>
							convertOptionToQueryParam(value)
						);
					}

					return convertOptionToQueryParam(optionValue);
				}
			);

			return temporaryQueryParams;
		},
		{} as Partial<QueryParams>
	);

	return queryParams;
}
