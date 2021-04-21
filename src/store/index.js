import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import * as mutationTypes from "./mutationTypes";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    account_id: null,
    products: {},
    cart: [],
    cart_meta: {},
    store_info: {},
    store_name: "",
    completed_order_info: {},
  },
  mutations: {
    [mutationTypes.SAVE_STORE](state, data) {
      state.store = data;
    },
    [mutationTypes.SAVE_SETTLEMENT](state, data) {
      state.settlement = data;
    },
    [mutationTypes.SAVE_PRODUCTS](state, data) {
      state.products = data;
    },
    [mutationTypes.SAVE_CART](state, data) {
      state.cart = data;
    },
    [mutationTypes.SAVE_CART_META](state, data) {
      state.cart_meta = data;
    },
    [mutationTypes.SAVE_STORE_NAME](state, data) {
      state.store_name = data;
    },
    [mutationTypes.SAVE_STORE_INFO](state, data) {
      state.store_info = data;
    },
    [mutationTypes.COMPLETED_ORDER_INFO](state, data) {
      state.completed_order_info = data;
    },
  },
  getters: {
    getStoreSettlement: (state) => state.settlement,

    getProducts: (state) => state.products,
    getStoreInfo: (state) => state.store_info,
    getCart: (state) => state.cart,
    getCartMeta: (state) => state.cart_meta,
    getStoreName: (state) => state.store_name,
    getCompletedOrderInfo: (state) => state.completed_order_info,
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
