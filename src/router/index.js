import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Store",
    component: () => import("../views/StoreView.vue"),
  },
  {
    path: "/confirmation",
    name: "Confirmation",
    component: () => import("../views/Confirmation.vue"),
  },
  {
    path: "/cart",
    name: "StoreCart",
    component: () => import("../views/StoreCart.vue"),
  },
  {
    path: "/store-item/:item_id",
    name: "ViewProduct",
    component: () => import("../views/ViewProduct.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
