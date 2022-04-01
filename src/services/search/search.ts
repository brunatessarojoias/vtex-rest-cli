import api from "@app/config/api";

const API_ENDPOINT = "catalog_system/pub/products/search";

export default async function search() {
	try {
		const { data } = await api(API_ENDPOINT);

		return data;
	} catch (err) {
		console.error(err);
	}
}
