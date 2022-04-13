type ParameterValue = string | number;
type ParametersObject = Record<string, ParameterValue>;

// TODO - Handle repeated parameters
// ? https://stackoverflow.com/questions/42898009/multiple-fields-with-same-key-in-query-params-axios-request
export default function paramsSerializer(params: string | ParametersObject) {
	if (typeof params === "string") {
		return encodeURI(params);
	}

	const serializedParams = new URLSearchParams(
		Object.fromEntries(
			Object.entries(params).map(([key, value]) => [
				key,
				encodeURIComponent(value),
			])
		)
	).toString();

	return serializedParams;
}
