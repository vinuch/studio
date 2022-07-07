import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import * as mutationTypes from "./mutationTypes";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "leyyow",
  // reducer: state => ({
  //   store: state.store,
  //   settlement: state.settlement,
  //   inventory: state.inventory,
  //   orders: state.orders,
  // })
});

export default new Vuex.Store({
  state: {
    account_id: null,
    email_verified: false,
    inventory: [],
    logged_in: false,
    settings: false, // view settings menu
    orders: [],
    settlement: {},
    store: {},
    to_be_editted: null,
    unregistered_email: "",
    unsaved_change: false,
    visitor_inventory: {},
    filter_option: 'Customer name',
    store_slug: "",
  },
  mutations: {
    [mutationTypes.EMAIL_VERIFIED](state, data) {
      state.email_verified = data;
      // console.log(state, data)
    },
    [mutationTypes.UNSAVED_CHANGE](state, data) {
      state.unsaved_change = data;
    },
    [mutationTypes.LOGOUT]() {
      // state.store = data;
      // localStorage.removeItem("leyyow")
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
    [mutationTypes.SAVE_STORE_SLUG](state, data) {
      state.store_slug = data;
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
    [mutationTypes.SET_SETTINGS_STATE](state, data) {
      state.settings = data;
    },
    [mutationTypes.UPDATE_EMAIL_VERIFIED](state, data) {
      state.email_verified = data;
      // console.log(state, data)
    },
    [mutationTypes.SET_FILTER_OPTION](state, data) {
      state.filter_option = data;
    },

  },
  getters: {
    getEmail: (state) => state.unregistered_email,
    getEmailStatus: (state) => state.email_verified,
    getStore: (state) => state.store,
    getStoreSlug: (state) => state.store_slug,
    getSettlement: (state) => state.settlement,
    getInventory: (state) => state.inventory,
    getLoggedIn: (state) => state.logged_in,
    getSettingsState: (state) => state.settings,
    getOrders: (state) => state.orders,
    getProductToBeEditted: (state) => state.to_be_editted,
    getUnsavedChange: (state) => state.unsaved_change,
    getFilterOption: (state) => state.filter_option,
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
