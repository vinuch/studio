import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: () => import("../views/Gallery.vue"),
  },
  // {
  //   path: "/desk_gallery",
  //   name: "DeskGallery",
  //   component: () => import("../views/DeskGallery.vue"),
  // },
  {
    path: "/confirmation",
    name: "Confirmation",
    component: () => import("../views/Confirmation.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/desk_cart",
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
