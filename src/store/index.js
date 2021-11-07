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
    account_id: null,
    email_verified: false,
    inventory: [],
    logged_in: false,
    manage: false, // view manage menu
    orders: [],
    settlement: {},
    store: {},
    to_be_editted: null,
    unregistered_email: "",
    unsaved_change: false,
    visitor_inventory: {},
  },
  mutations: {
    [mutationTypes.EMAIL_VERIFIED](state, data) {
      state.email_verified = data;
    },
    [mutationTypes.UNSAVED_CHANGE](state, data) {
      state.unsaved_change = data;
    },
    [mutationTypes.LOGOUT](state, data) {
      state.store = data;
    },
    [mutationTypes.LOGGED_IN](state, data) {
      state.logged_in = data;
    },
    [mutationTypes.SAVE_EMAIL](state, data) {
      state.unregistered_email = data;
    },
    [mutationTypes.SAVE_STORE](state, data) {
      state.store = data;
    },
    [mutationTypes.SAVE_SETTLEMENT](state, data) {
      state.settlement = data;
    },
    [mutationTypes.SAVE_ACCOUNT_ID](state, data) {
      state.account_id = data;
    },
    [mutationTypes.SAVE_INVENTORY](state, data) {
      state.inventory = data;
    },
    [mutationTypes.SAVE_VISITOR_INVENTORY](state, data) {
      state.visitor_inventory = data;
    },
    [mutationTypes.SAVE_ORDERS](state, data) {
      state.orders = data;
    },
    [mutationTypes.SET_PRODUCT_TO_BE_EDITTED](state, data) {
      state.to_be_editted = data;
    },
    [mutationTypes.SET_MANAGE_STATE](state, data) {
      state.manage = data;
    },
  },
  getters: {
    getEmail: (state) => state.unregistered_email,
    getStore: (state) => state.store,
    getSettlement: (state) => state.settlement,
    getInventory: (state) => state.inventory,
    getLoggedIn: (state) => state.logged_in,
    getManageState: (state) => state.manage,
    getOrders: (state) => state.orders,
    getProductToBeEditted: (state) => state.to_be_editted,
    getUnsavedChange: (state) => state.unsaved_change,
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
