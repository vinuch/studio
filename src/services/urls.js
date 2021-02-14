// export const baseUrl = process.env.VUE_APP_API_BASE_URL;
export const baseUrl =
  "https://cors-anywhere.herokuapp.com/https://api.iamcart.io/";
export const loginUrl = `${baseUrl}user/api_login/`;
export const createStoreUrl = `${baseUrl}api/account/store/create/`;
export const updateStoreUrl = `${baseUrl}api/account/store/update/`;
export const createProductUrl = `${baseUrl}api/inventory/product/create/`;
export const saveOrderUrl = `${baseUrl}api/inventory/order/create/`;
export const createOrderUrl = `${baseUrl}api/inventory/order_item/create/`;
export const updateProductUrl = `${baseUrl}api/inventory/product/update/`;
export const inventoryUrl = `${baseUrl}api/inventory/product/`;
export const ordersUrl = `${baseUrl}api/inventory/order/`;
export const orderItemUrl = `${baseUrl}api/inventory/order_items/`;
export const joinWaitListUrl = `${baseUrl}api/account/waitlist/join/`;
export const updateOrderStatus = `${baseUrl}api/inventory/order_item/update/`;
export const storeInfoUrl = `${baseUrl}api/account/store/`;
