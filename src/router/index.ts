import HomeView from "@/views/HomeView.vue";
import PlayView from "@/views/PlayView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView },
    { path: "/play", component: PlayView },
  ],
});

export default router;
