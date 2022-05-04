import api from "@config/api";
import debugInventory from "./utils/debug";
import randomId from "@services/common/utils/randomId";
import type { InventoryBySku } from "./types/inventory";

const debug = debugInventory.extend("listInventoryBySku");

const API_ENDPOINT = "logistics/pvt/inventory/skus";

export default async function listInventoryBySku(
	skuId: string
): Promise<InventoryBySku> {
	try {
		const requestId = randomId();

		debug(`Requesting data for skuId: ${skuId}. (requestId: ${requestId})`);

		const { data } = await api(`${API_ENDPOINT}/${skuId}`);

		debug(`Request done. (requestId: ${requestId})`);

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
