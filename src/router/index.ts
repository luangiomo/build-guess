import HomeView from "@/views/HomeView.vue";
import PlayView from "@/views/PlayView.vue";
import ErrorView from "@/views/ErrorView.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    { path: "/", component: HomeView },
    { path: "/play", component: PlayView },
    { path: "/error", component: ErrorView },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
