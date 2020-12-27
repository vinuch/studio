import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./styles/fonts.css";

import axios from "axios";

Vue.config.productionTip = false;
Vue.use(Antd);

let token = window.sessionStorage.getItem("iam_cart_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
