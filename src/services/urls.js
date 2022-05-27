// General
export const baseUrl = process.env.VUE_APP_API_BASE_URL
console.log(process.env.NODE_ENV, baseUrl)
const prefix = process.env.NODE_ENV === 'development' ? '/' : baseUrl

// Signup and registration
export const joinWaitListUrl = `${prefix}api/account/waitlist/join/`;
export const loginUrl = `${prefix}user/api_login/`;
export const requestPasswordResetUrl = `${prefix}api/account/password_reset/`;
export const signUpUrl = `${prefix}api/account/signup/`;
export const updatePasswordUrl = `${prefix}api/account/password_reset/confirm/`;
export const verifyEmailPhoneUrl = `${prefix}api/account/verify_email_phone/`;
export const verifyPasswordResetTokenUrl = `${prefix}api/account/password_reset/verify_token/`;

// Store particulars
// export const createStoreUrl = `${prefix}api/account/store/create/`;
export const createStoreUrl = `${prefix}user/api_create_store/`;
export const updateStoreUrl = `${prefix}api/account/store/update/`;

// Paystack
export const bankListUrl = `https://api.paystack.co/bank`;
export const createSubAccUrl = `https://api.paystack.co/subaccount`;
export const resolveAccUrl = `https://api.paystack.co/bank/resolve?account_number=`;
export const transCodeUrl = `https://api.paystack.co/transferrecipient`;

// Products
export const createImageUrl = `${prefix}api/inventory/product/image/create/`;
export const createProductUrl = `${prefix}api/inventory/product/create/`;
export const initialiseProductUrl = `${prefix}product/initialise/`;
export const inventoryUrl = `${prefix}api/inventory/product/`;
export const updateProductUrl = `${prefix}api/inventory/product/update/`;
export const deleteProductUrl = `${prefix}api/inventory/product/`;

// Orders
export const ordersUrl = `${prefix}api/inventory/order/`;
export const orderItemUrl = `${prefix}api/inventory/order_items/`;
export const updateOrderStatus = `${prefix}api/inventory/order_item/update/`;

// Merchant payments
export const saveBankUrl = `${prefix}api/settlement/bank/create/`;

// Store
export const storeUrl = `${prefix}api/account/store/gadgets`;

