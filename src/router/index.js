import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Principal from '../components/Principal.vue';
import CrudEstadio from '../components/CrudEstadio.vue';
import CrudPartido from '../components/CrudPartido.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/principal', component: Principal },
  { path: '/crud-estadio', component: CrudEstadio },
  { path: '/crud-partido', component: CrudPartido },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
