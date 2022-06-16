import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from '@vue/composition-api'
import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';
import axios from "axios"

Vue.use(VueCompositionAPI)
Vue.use(VueToast);
Vue.config.productionTip = false

let token = window.sessionStorage.getItem("leyyow_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
