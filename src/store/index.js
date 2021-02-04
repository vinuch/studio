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
    store: {},
    account_id: null,
    inventory: [],
    orders: [],
    visitor_inventory: {},
    visitor_cart: [],
    visited_store_name: "",
  },
  mutations: {
    [mutationTypes.SAVE_STORE](state, data) {
      state.store = data;
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
    [mutationTypes.SAVE_VISITED_STORE_NAME](state, data) {
      state.visited_store_name = data;
    },
  },
  getters: {
    getStore: (state) => state.store,
    getInventory: (state) => state.inventory,
    getOrders: (state) => state.orders,

    getVisitorStore: (state) => state.visitor_inventory,
    getVisitorCart: (state) => state.visitor_cart,
    getVisitedStoreName: (state) => state.visited_store_name,
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
