import "dotenv/config";
import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

import { ENV, API } from "./constants";
import getEnvVar from "./utils/getEnvVar";

const config = {
	baseURL: `https://${getEnvVar(ENV.VTEX_ACCOUNT)}.${getEnvVar(
		ENV.VTEX_ENV
	)}.com.br/api`,
	headers: {
		"X-VTEX-API-AppKey": getEnvVar(ENV.VTEX_APP_KEY),
		"X-VTEX-API-AppToken": getEnvVar(ENV.VTEX_APP_TOKEN),
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	timeout: API.TIMEOUT_IN_MILLISECONDS,
};

const api = axiosRateLimit(axios.create(config), {
	maxRPS: API.MAX_REQUESTS_PER_MILLISECONDS,
});

export default api;
