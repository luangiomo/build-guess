import HomeView from "@/views/HomeView.vue";
import PlayView from "@/views/PlayView.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    { path: "/", component: HomeView },
    { path: "/play", component: PlayView },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
