import { createRouter, createWebHashHistory } from "vue-router";

import store from "@/store"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: { name: "home" }, meta: { requiresAuth: true } },
    { path: "/login", name: "login", component: () => import("@/pages/login") },
    {
      path: "/index",
      name: "home",
      redirect: { name: "homeContent" },
      // component: () => import("@/pages/home/Home"),
      component: () => import("@/pages/home/"),
      children: [
        {
          path: "content",
          name: "homeContent",
          component: () => import("@/pages/HomeMain/HomeMain"),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && to.meta.requiresAuth) {
      if(store.state.userInfo){
          next()
      }else{
        next({
          name: "login",
          query: {
            redirect: to.fullPath, //记住 用户跳转之前 url 的地址 
          },
        })
      }
    
  } else {
    next();
  }
});

export default router;
