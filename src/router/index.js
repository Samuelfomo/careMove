import { createRouter, createWebHistory } from 'vue-router';
import Home from "@public/home.vue";
import Auth from "@public/auth.vue";
import Parrain from "@public/sponsorshipForm.vue";
import Register from "@public/registrationForm.vue";
import Register2 from "@public/QuickRegistration.vue";
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
  {
    path: '/parain',
    name: 'parain',
    component: Parrain
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/register2',
    name: 'register2',
    component: Register2
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
