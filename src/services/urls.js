// General
export const baseUrl = process.env.VUE_APP_API_BASE_URL

// Signup and registration
export const joinWaitListUrl = `${baseUrl}api/account/waitlist/join/`;
export const loginUrl = `${baseUrl}user/api_login/`;
export const requestPasswordResetUrl = `${baseUrl}api/account/password_reset/`;
export const signUpUrl = `${baseUrl}api/account/signup/`;
export const updatePasswordUrl = `${baseUrl}api/account/password_reset/confirm/`;
export const verifyEmailPhoneUrl = `${baseUrl}api/account/verify_email_phone/`;
export const verifyPasswordResetTokenUrl = `${baseUrl}api/account/password_reset/verify_token/`;

// Store particulars
export const createStoreUrl = `${baseUrl}api/account/store/create/`;
export const updateStoreUrl = `${baseUrl}api/account/store/update/`;

// Paystack
export const bankListUrl = `https://api.paystack.co/bank`;
export const createSubAccUrl = `https://api.paystack.co/subaccount`;
export const resolveAccUrl = `https://api.paystack.co/bank/resolve?account_number=`;
export const transCodeUrl = `https://api.paystack.co/transferrecipient`;

// Products
export const createImageUrl = `${baseUrl}api/inventory/product/image/create/`;
export const createProductUrl = `${baseUrl}api/inventory/product/create/`;
export const initialiseProductUrl = `${baseUrl}product/initialise/`;
export const inventoryUrl = `${baseUrl}api/inventory/product/`;
export const updateProductUrl = `${baseUrl}api/inventory/product/update/`;

// Orders
export const ordersUrl = `${baseUrl}api/inventory/order/`;
export const orderItemUrl = `${baseUrl}api/inventory/order_items/`;
export const updateOrderStatus = `${baseUrl}api/inventory/order_item/update/`;

// Merchant payments
export const saveBankUrl = `${baseUrl}api/settlement/bank/create/`;
