import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import * as mutationTypes from "./mutationTypes";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "leyyow",
});

export default new Vuex.Store({
  state: {
    store: {},
    settlement: {},
    account_id: null,
    inventory: [],
    orders: [],
    unregistered_email: "",
    to_be_editted: null,
    visitor_inventory: {},
    visitor_cart: [],
    visited_store_name: "",
    form_touched: false,
  },
  mutations: {
    [mutationTypes.SAVE_EMAIL](state, data) {
      state.unregistered_email = data;
    },
    [mutationTypes.SAVE_STORE](state, data) {
      state.store = data;
    },
    [mutationTypes.SAVE_SETTLEMENT](state, data) {
      state.settlement = data;
    },
    [mutationTypes.SAVE_VISITOR_INVENTORY](state, data) {
      state.visitor_inventory = data;
    },
    [mutationTypes.SAVE_ACCOUNT_ID](state, data) {
      state.account_id = data;
    },
    [mutationTypes.SAVE_INVENTORY](state, data) {
      state.inventory = data;
    },
    [mutationTypes.SAVE_ORDERS](state, data) {
      state.orders = data;
    },
    [mutationTypes.SAVE_VISITOR_CART](state, data) {
      state.visitor_cart = data;
    },
    [mutationTypes.SAVE_PRODUCT_TO_BE_EDITTED](state, data) {
      state.to_be_editted = data;
    },
    [mutationTypes.SAVE_VISITED_STORE_NAME](state, data) {
      state.visited_store_name = data;
    },
    [mutationTypes.FORM_TOUCHED](state, data) {
      state.form_touched = data;
    },
  },
  getters: {
    getEmail: (state) => state.unregistered_email,
    getStore: (state) => state.store,
    getSettlement: (state) => state.settlement,
    getInventory: (state) => state.inventory,
    getOrders: (state) => state.orders,
    getItemToBeEditted: (state) => state.to_be_editted,
    getFormTouched: (state) => state.form_touched,

    getVisitorStore: (state) => state.visitor_inventory,
    getVisitorCart: (state) => state.visitor_cart,
    getVisitedStoreName: (state) => state.visited_store_name,
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
