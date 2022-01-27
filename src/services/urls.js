// General
export const baseUrl = process.env.VUE_APP_API_BASE_URL

// Signup and registration
export const joinWaitListUrl = `/api/account/waitlist/join/`;
export const loginUrl = `/user/api_login/`;
export const requestPasswordResetUrl = `/api/account/password_reset/`;
export const signUpUrl = `/api/account/signup/`;
export const updatePasswordUrl = `/api/account/password_reset/confirm/`;
export const verifyEmailPhoneUrl = `/api/account/verify_email_phone/`;
export const verifyPasswordResetTokenUrl = `/api/account/password_reset/verify_token/`;

// Store particulars
// export const createStoreUrl = `/api/account/store/create/`;
export const createStoreUrl = `/user/api_create_store/`;
export const updateStoreUrl = `/api/account/store/update/`;

// Paystack
export const bankListUrl = `https://api.paystack.co/bank`;
export const createSubAccUrl = `https://api.paystack.co/subaccount`;
export const resolveAccUrl = `https://api.paystack.co/bank/resolve?account_number=`;
export const transCodeUrl = `https://api.paystack.co/transferrecipient`;

// Products
export const createImageUrl = `/api/inventory/product/image/create/`;
export const createProductUrl = `/api/inventory/product/create/`;
export const initialiseProductUrl = `/product/initialise/`;
export const inventoryUrl = `/api/inventory/product/`;
export const updateProductUrl = `/api/inventory/product/update/`;

// Orders
export const ordersUrl = `/api/inventory/order/`;
export const orderItemUrl = `/api/inventory/order_items/`;
export const updateOrderStatus = `/api/inventory/order_item/update/`;

// Merchant payments
export const saveBankUrl = `/api/settlement/bank/create/`;
