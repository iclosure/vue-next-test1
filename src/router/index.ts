import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/components/Home.vue";
import Test from "@/components/Test.vue";
import About from "@/components/About.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/test",
    name: "Test",
    component: Test
  },
  {
    path: "/about",
    name: "About",
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to?.meta?.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
