import { createRouter, createWebHistory } from 'vue-router';
const wells = () => import('../views/wells/WellList.vue');
const home = () => import('../views/home/HomeIndex.vue');
const prod = () => import('../views/prod/ProdWell.vue');

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: home,
  },
  {
    path: '/wells',
    component: wells,
  },
  {
    path: '/prod',
    component: prod,
  },
];
export default createRouter({
  history: createWebHistory(),
  routes,
});
