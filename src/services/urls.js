export const baseUrl = process.env.VUE_APP_API_BASE_URL

const prefix = process.env.NODE_ENV === 'development' ? '/' : baseUrl

export const saveOrderUrl = `${prefix}api/inventory/order/create/`;
export const createOrderUrl = `${prefix}api/inventory/order_item/create/`;
export const inventoryUrl = `${prefix}api/inventory/product/`;
export const ordersUrl = `${prefix}api/inventory/order/`;
export const orderItemUrl = `${prefix}api/inventory/order_items/`;
export const joinWaitListUrl = `${prefix}api/account/waitlist/join/`;
export const updateOrderStatus = `${prefix}api/inventory/order_item/update/`;
export const storeInfoUrl = `${prefix}api/account/store/`;
export const storeSettlementUrl = `${prefix}api/settlement/bank/`;
