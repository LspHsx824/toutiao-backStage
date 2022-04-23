import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: { name: "login" } },
    { path: "/login", component: () => import("@/pages/login") },
    { path: "/index",name:"home", component: () => import("@/pages/home/Home") },
  ],
});

export default router;
