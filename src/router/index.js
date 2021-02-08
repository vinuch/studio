import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/About.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("../views/ResetPassword.vue"),
  },
  {
    path: "/create-password",
    name: "CreatePassword",
    component: () => import("../views/CreatePassword.vue"),
  },
  {
    path: "/store-cart",
    name: "StoreCart",
    component: () => import("../views/StoreCart.vue"),
  },
  {
    path: "/view-product",
    name: "ViewProduct",
    component: () => import("../views/ViewProduct.vue"),
  },
  {
    path: "/dashboard/",
    // name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    children: [
      {
        path: "setup",
        name: "Setup",
        component: () => import("../views/Dashboard/Setup.vue"),
      },
      {
        path: "report",
        name: "Report",
        component: () => import("../views/Dashboard/Report.vue"),
      },
      {
        path: "orders",
        name: "Orders",
        component: () => import("../views/Dashboard/Orders.vue"),
      },
      {
        path: "inventory",
        name: "Inventory",
        component: () => import("../views/Dashboard/Inventory.vue"),
      },
      {
        path: "manage",
        name: "Manage",
        component: () => import("../views/Dashboard/Manage.vue"),
      },
    ],
  },
  {
    path: "/privacy",
    name: "Store",
    component: () => import("../views/Privacy.vue"),
  },
  {
    path: "/:store_name",
    name: "Store",
    component: () => import("../views/StoreView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
