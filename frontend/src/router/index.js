import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Principal from '../components/Principal.vue';
import CrudEstadio from '../components/CrudEstadio.vue';
import CrudPartido from '../components/CrudPartido.vue';
import CrudEquipo from '../components/CrudEquipo.vue';
import CrudFutbolista from '../components/CrudFutbolista.vue';
import CrudUsuario from '../components/CrudUsuario.vue';
import EstadiosMayorAudiencia from '../views/reports/EstadiosMayorAudiencia.vue';
import EstadoEquipo from '../views/reports/EstadoEquipo.vue';
import PartidosPorEquipo from '../views/reports/PartidosPorEquipo.vue';
import PartidosPorFecha from '../views/reports/PartidosPorFecha.vue';
import TablaDePosiciones from '../views/reports/TablaDePosiciones.vue';

const routes = [
  { path: '/', component: Principal },
  { path: '/login', component: Login },
  { path: '/crud-estadio', component: CrudEstadio },
  { path: '/crud-partido', component: CrudPartido },
  { path: '/crud-equipo', component: CrudEquipo },
  { path: '/crud-futbolista', component: CrudFutbolista },
  { path: '/crud-usuario', component: CrudUsuario },
  { path: '/tabla-posiciones', component: TablaDePosiciones },
  { path: '/partidos-por-equipos', component: PartidosPorEquipo },
  { path: '/partidos-por-fecha', component: PartidosPorFecha },
  { path: '/estadios-mayor-audiencia', component: EstadiosMayorAudiencia },
  { path: '/estado-equipo', component: EstadoEquipo },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
