import api from "@config/api";
import debugInventory from "./utils/debug";
import randomId from "@services/common/utils/randomId";
import type { InventoryUpdateParameters } from "./types";
import type { AxiosRequestConfig } from "axios";

const debug = debugInventory.extend("updateInventoryBySkuAndWareHouse");

const BASE_API_ENDPOINT = "logistics/pvt/inventory/skus";

const getApiEndpoint = (skuId: string, warehouseId: string) =>
	`${BASE_API_ENDPOINT}/${skuId}/warehouses/${warehouseId}`;

export default async function updateInventoryBySkuAndWarehouse({
	skuId,
	warehouseId,
	quantity,
	unlimitedQuantity,
}: InventoryUpdateParameters) {
	try {
		const requestId = randomId();
		const payload = {
			quantity,
			unlimitedQuantity,
		};
		const apiHeaders: AxiosRequestConfig = {
			method: "PUT",
			data: payload,
		};

		debug(
			`Sending update request for skuId: ${skuId} and warehouseId: ${warehouseId}, payload: %O (id: ${requestId})`,
			payload
		);

		const { status, statusText } = await api(
			getApiEndpoint(skuId, warehouseId),
			apiHeaders
		);

		debug(`Request successful. (id: ${requestId})`);

		return {
			data: {
				skuId,
				...payload,
			},
			metadata: {
				status,
				statusText,
			},
		};
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
