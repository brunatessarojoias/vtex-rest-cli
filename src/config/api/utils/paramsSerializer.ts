type ParameterValues = Array<string>;
type ParametersObject = {
	[parameterId: string]: ParameterValues;
};

export default function paramsSerializer(params: ParametersObject | string) {
	if (typeof params === "string") {
		return encodeURI(params);
	}

	const urlParams = new URLSearchParams();

	Object.entries(params).forEach(([paramId, paramValues]) => {
		paramValues.forEach(value =>
			urlParams.append(paramId, encodeURI(value))
		);
	});

	const queryParametersAsString = urlParams.toString();

	return queryParametersAsString;
}
