export type InventoryBySku = {
	skuId: string;
	balance: Array<SkuWarehouseBalance>;
};

export type SkuWarehouseBalance = {
	warehouseId: string;
	warehouseName: string;
	totalQuantity: number;
	reservedQuantity: number;
	hasUnlimitedQuantity: boolean;
};
