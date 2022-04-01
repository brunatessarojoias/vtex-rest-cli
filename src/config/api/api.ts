import "dotenv/config";
import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

function getEnvVar(key: keyof NodeJS.ProcessEnv): string {
	const value = process.env[key];

	if (value === undefined) {
		const message = `The environment variable "${key}" cannot be "undefined".`;

		throw new Error(message);
	}

	return value;
}

const VTEX_ACCOUNT = getEnvVar("VTEX_ACCOUNT");
const VTEX_ENV = getEnvVar("VTEX_ENV");
const VTEX_APP_KEY = getEnvVar("VTEX_APP_KEY");
const VTEX_APP_TOKEN = getEnvVar("VTEX_APP_TOKEN");

const config = {
	baseURL: `https://${VTEX_ACCOUNT}.${VTEX_ENV}.com.br/api`,
	headers: {
		"X-VTEX-API-AppKey": VTEX_APP_KEY,
		"X-VTEX-API-AppToken": VTEX_APP_TOKEN,
		"Content-Type": "application/json",
		Accept: "application/json",
	},
};

const api = axiosRateLimit(axios.create(config), { maxRPS: 5 });

export default api;
