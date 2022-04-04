export default function getEnvVar(key: keyof NodeJS.ProcessEnv): string {
	const value = process.env[key];

	if (value === undefined) {
		// eslint-disable-next-line max-len
		const message = `The environment variable "${key}" cannot be "undefined".`;

		throw new Error(message);
	}

	return value;
}
