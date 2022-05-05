import api from "@config/api";
import debugInventory from "./utils/debug";
import randomId from "@services/common/utils/randomId";
import type { InventoryBySku } from "./types";

const debug = debugInventory.extend("listInventoryBySku");

const BASE_API_ENDPOINT = "logistics/pvt/inventory/skus";

const getApiEndpoint = (skuId: string) => `${BASE_API_ENDPOINT}/${skuId}`;

export default async function listInventoryBySku(
	skuId: string
): Promise<InventoryBySku> {
	try {
		const requestId = randomId();

		debug(`Requesting data for skuId: ${skuId}... (id: ${requestId})`);

		const { data } = await api(getApiEndpoint(skuId));

		debug(`Request successful. (id: ${requestId})`);

		return data;
	} catch (err) {
		// TODO - Handle Axios and VTEX errors
		console.error(err);

		/*
		 ? Temporary fix:
		 ? throw 'err' after catch to prevent undefined return
		 */
		throw err;
	}
}
