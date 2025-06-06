import { createRouter, createWebHistory } from 'vue-router';
import Home from "@public/home.vue";
import Auth from "@public/auth.vue";

const routes = [

  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: Auth
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
