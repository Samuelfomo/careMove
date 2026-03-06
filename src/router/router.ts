import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '@public/home.vue';
import Auth2 from '@public/auth.vue';
import Auth from '@public/login/auth2.vue';
import Parrain from '@public/sponsorshipForm.vue';
import Register from '@public/registrationForm.vue';
import Register2 from '@public/QuickRegistration.vue';
import ProposeTrip from '../../public/proposeTrip.vue';
import searchTrip from '../../public/searchTrip.vue';
import Profile from '../../public/profile.vue';
import Dashboard from '../../public/app/components/dashboard.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/connexion2',
    name: 'connexion2',
    component: Auth2,
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: Auth,
  },
  {
    path: '/parain',
    name: 'parain',
    component: Parrain,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/register2',
    name: 'register2',
    component: Register2,
  },
  {
    path: '/proposeTrip',
    name: 'proposeTrip',
    component: ProposeTrip,
  },
  {
    path: '/searchTrip',
    name: 'searchTrip',
    component: searchTrip,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
