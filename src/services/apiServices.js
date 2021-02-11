import axios from "axios";
import * as urls from "./urls";

import * as mutationTypes from "../store/mutationTypes";
import store from "../store/index";

export const apiLogin = (data) => {
  return axios({
    method: "post",
    url: urls.loginUrl,
    data,
  });
};

export const createStore = (data) => {
  return axios({
    method: "post",
    url: urls.createStoreUrl,
    data,
  });
};

export const joinWaitlist = (data) => {
  return axios({
    method: "post",
    url: urls.joinWaitListUrl,
    data,
  });
};

export const updateStore = (data) => {
  return axios({
    method: "patch",
    url: urls.updateStoreUrl,
    data,
  });
};

export const createProduct = (data) => {
  return axios({
    method: "post",
    url: urls.createProductUrl,
    data,
  });
};

export const updateProduct = (data, id) => {
  return axios({
    method: "patch",
    url: `${urls.updateProductUrl}${id}/`,
    data,
  });
};

export const fetchStoreInfo = (slug) => {
  axios({
    method: "get",
    url: `${urls.storeInfoUrl}${slug}`,
  }).then((res) => {
    store.commit(mutationTypes.SAVE_VISITED_STORE_INFO, res.data);
  });
};

export const fethcStoreInventory = (slug, n) => {
  axios({
    method: "get",
    url: `${urls.inventoryUrl}${slug}/`,
  })
    .then((res) => {
      n
        ? store.commit(
            mutationTypes.SAVE_VISITOR_INVENTORY,
            res.data.map((itm) => {
              return {
                ...itm,
                picked_variant_value: [],
              };
            })
          )
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

export const updateOrderStatus = (id) => {
  return axios({
    method: "patch",
    url: `${urls.updateOrderStatus}${id}/`,
    data: {
      status: 1,
    },
  });
};
