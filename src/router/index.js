import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import CartPage from "@/pages/CartPage.vue";
import Rubbish from "@/pages/Rubbish.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Rubbish,
  },
  {
    path: "/cart-page/:id",
    name: "CartPage",
    component: CartPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
