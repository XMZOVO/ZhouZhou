import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../App.vue"),
    children: [
      {
        path: "",
        component: () => import("../components/MainPage.vue"),
      },
      {
        path: "WebG4",
        component: () => import("../components/WebG4.vue"),
      },
    ],
  },
];

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});
