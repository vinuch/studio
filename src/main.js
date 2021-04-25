import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Antd from "ant-design-vue";

import { Alert, Drawer, Row, Col, Icon, Button } from "ant-design-vue";

import "ant-design-vue/lib/alert/style/css";
import "ant-design-vue/lib/drawer/style/css";
import "ant-design-vue/lib/row/style/css";
import "ant-design-vue/lib/col/style/css";
import "ant-design-vue/lib/icon/style/css";
import "ant-design-vue/lib/button/style/css";
import "./styles/fonts.css";

import axios from "axios";

Vue.config.productionTip = false;
Vue.use(Alert);
Vue.use(Drawer);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Button);

let token = window.sessionStorage.getItem("leyyow_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
