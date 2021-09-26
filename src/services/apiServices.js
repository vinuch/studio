import axios from "axios";
import * as urls from "./urls";

import * as mutationTypes from "@/store/mutationTypes";
import store from "@/store/index";

try {
  var auth = store.getters.getSettlement.keys.paystack_secret_key
} catch {null}

export const apiLogin = (data) => {
  return axios({
    method: "post",
    url: urls.loginUrl,
    data,
  });
};

export const signUp = (data) => {
  return axios({
    method: "post",
    url: urls.signUpUrl,
    data,
  });
};

export const verifyEmailPhone = (otp, email_or_phone) => {
  return axios({
    method: "get",
    url: `${urls.verifyEmailPhoneUrl}${email_or_phone}/${otp}/`,
    // data,
  });
};

export const requestPasswordReset = (data) => {
  return axios({
    method: "post",
    url: urls.requestPasswordResetUrl,
    data,
  })
};

export const updatePassword = (data) => {
  return axios({
    method: "post",
    url: urls.updatePasswordUrl,
    data,
  })
};

export const verifyPasswordResetToken = (data) => {
  return axios({
    method: "post",
    url: urls.verifyPasswordResetTokenUrl,
    data,
  })
};

export const createStore = (data) => {
  return axios({
    method: "post",
    url: urls.createStoreUrl,
    data,
  })
  .then((res) => {
    store.commit(mutationTypes.SAVE_STORE, res.data);
  })
  .catch((err) => {
    console.log({ err });
  });
};

export const joinWaitlist = (data) => {
  return axios({
    method: "post",
    url: urls.joinWaitListUrl,
    data,
  });
};

export const updateStore = (data, id) => {
  return axios({
    method: "patch",
    url: `${urls.updateStoreUrl}${id}/`,
    data,
  });
};

export const createImage = (data) => {
  return axios({
    method: "post",
    url: urls.createImageUrl,
    data,
  });
};

export const initialiseProduct = (id) => {
  let data = {image_id: id}
  return axios({
    method: "post",
    url: urls.initialiseProductUrl,
    data,
  });
};

export const createProduct = (data) => {
  return axios({
    method: "post",
    url: urls.createProductUrl,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
};

export const updateProduct = (data, id) => {
  return axios({
    method: "patch",
    url: `${urls.updateProductUrl}${id}/`,
    data,
  });
};

export const fethcStoreInventory = (slug, n) => {
  axios({
    method: "get",
    url: `${urls.inventoryUrl}${slug}/`,
  })
    .then((res) => {
      n
        ? store.commit(mutationTypes.SAVE_VISITOR_INVENTORY, res.data)
        : store.commit(mutationTypes.SAVE_INVENTORY, res.data);
    })
    .catch(() => {
      // console.log(err);
    });
};

export const fetchOrders = () => {
  axios({
    method: "get",
    url: urls.ordersUrl,
  })
    .then((res) => {
      store.commit(mutationTypes.SAVE_ORDERS, res.data);
    })
    .catch(() => {
      // console.log({ err });
    });
};

export const fetchOrderItems = (id) => {
  return axios({
    method: "get",
    url: `${urls.orderItemUrl}${id}/`,
  });
};

export const updateOrderStatus = (id, status) => {
  return axios({
    method: "patch",
    url: `${urls.updateOrderStatus}${id}/`,
    data: {
      status,
    },
  });
};

export const bankList = () => {
  console.log("Bearer " + auth)
  return axios({
    method: "get",
    url: urls.bankListUrl,
    headers: {
      "Authorization": "Bearer " + auth,
    },
  });
};

export const resolveAcc = (bank_code, acc_no) => {
  console.log("api services")
  return axios({
    method: "get",
    url: `${urls.resolveAccUrl}${acc_no}&bank_code=${bank_code}`,
    headers: {
      "Authorization": "Bearer " + auth,
    },
  });
};

export const createSubAcc = (data) => {
  return axios({
    method: "post",
    url: urls.createSubAccUrl,
    data,
    headers: {
      "Authorization": "Bearer " + auth,
    },
  });
};

export const saveMerchSettlement = (data) => {
  return axios({
    method: "post",
    url: urls.saveBankUrl,
    data,
  });
};
