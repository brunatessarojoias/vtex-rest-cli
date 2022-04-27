import type { CommonSearchOptionsValuesAsObject } from "../search.types";

type InterpolationOptions = {
	inputString: string;
	interpolationValues: CommonSearchOptionsValuesAsObject;
	optionalVariables?: Array<string>;
	variableDivider?: string;
};

export default function applyVariablesInterpolation({
	inputString,
	interpolationValues,
	optionalVariables,
	variableDivider,
}: InterpolationOptions) {
	if (optionalVariables) {
		optionalVariables.forEach(optionalVariable => {
			if (interpolationValues[optionalVariable] === undefined) {
				delete interpolationValues[optionalVariable];

				inputString = inputString.replace(`{${optionalVariable}}`, "");

				inputString = inputString.replace(
					`${variableDivider}`.repeat(2),
					`${variableDivider}`
				);
			}
		});
	}

	Object.entries(interpolationValues).forEach(([variable, replacement]) => {
		if (replacement === undefined)
			throw new TypeError("variable 'replacement' can't be undefined");

		inputString = inputString.replace(`{${variable}}`, `${replacement}`);
	});

	return inputString;
}
