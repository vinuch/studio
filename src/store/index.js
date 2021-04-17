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
    // store: {},
    account_id: null,
    // settlement: {},
    // inventory: [],
    // orders: [],
    // to_de_editted: null,

    visitor_inventory: {},
    cart: [],
    cart_meta: {},
    store_info: {},
    store_name: "",
    // form_touched: false,
    completed_order_info: {},
  },
  mutations: {
    [mutationTypes.SAVE_STORE](state, data) {
      state.store = data;
    },
    // [mutationTypes.SAVE_SETTLEMENT](state, data) {
    //   state.settlement = data;
    // },
    [mutationTypes.SAVE_INVENTORY](state, data) {
      state.visitor_inventory = data;
    },
    // [mutationTypes.SAVE_ACCOUNT_ID](state, data) {
    //   state.account_id = data;
    // },
    // [mutationTypes.SAVE_INVENTORY](state, data) {
    //   state.inventory = data;
    // },
    // [mutationTypes.SAVE_ORDERS](state, data) {
    //   state.orders = data;
    // },
    [mutationTypes.SAVE_CART](state, data) {
      state.cart = data;
    },
    [mutationTypes.SAVE_CART_META](state, data) {
      state.cart_meta = data;
    },
    // [mutationTypes.SAVE_PRODUCT_TO_BE_EDITTED](state, data) {
    //   state.to_de_editted = data;
    // },
    [mutationTypes.SAVE_STORE_NAME](state, data) {
      state.store_name = data;
    },
    [mutationTypes.SAVE_STORE_INFO](state, data) {
      state.store_info = data;
    },
    // [mutationTypes.FORM_TOUCHED](state, data) {
    //   state.form_touched = data;
    // },
    [mutationTypes.COMPLETED_ORDER_INFO](state, data) {
      state.completed_order_info = data;
    },
  },
  getters: {
    // getStore: (state) => state.store,
    // getStoreSettlement: (state) => state.settlement,
    // getInventory: (state) => state.inventory,
    // getOrders: (state) => state.orders,
    // getItemToBeEditted: (state) => state.to_de_editted,
    // getFormTouched: (state) => state.form_touched,

    getVisitorStore: (state) => state.visitor_inventory,
    getVisitedStoreInfo: (state) => state.store_info,
    getVisitorCart: (state) => state.cart,
    getCartMeta: (state) => state.cart_meta,
    getVisitedStoreName: (state) => state.store_name,
    getCompletedOrderInfo: (state) => state.completed_order_info,
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
