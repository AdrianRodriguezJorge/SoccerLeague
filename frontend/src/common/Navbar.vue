<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Liga Nacional de Fútbol</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown" v-for="(item, index) in filteredMenuItems" :key="index">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              :id="item.id"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ item.name }}
            </a>
            <ul class="dropdown-menu" :aria-labelledby="item.id">
              <router-link
                v-for="(subItem, subIndex) in item.subItems"
                :key="subIndex"
                :to="subItem.to"
                class="dropdown-item"
                @click="subItem.action ? handleMenuItemClick(subItem.action) : null"
              >
                {{ subItem.name }}
              </router-link>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="usuarioActual">
            <span class="nav-link" style="color: white;">
              Usuario: {{ usuarioActual }}
            </span>
          </li>
          <li class="nav-item">
            <button class="btn btn-link nav-link" @click="usuarioActual ? cerrarSesion() : iniciarSesion()" style="color: white;">
              {{ usuarioActual ? 'Cerrar sesión' : 'Iniciar sesión' }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Modal para iniciar liga -->
  <b-modal v-model="showLigaModal" title="Iniciar Liga" centered>
    <div class="form-group">
      <label for="fechaInicio">Fecha de Inicio</label>
      <input type="date" class="form-control" v-model="fechaInicio" required />
    </div>
    <div class="form-group">
      <label for="fechaFin">Fecha de Fin</label>
      <input type="date" class="form-control" v-model="fechaFin" required />
    </div>
    <div class="d-flex justify-content-center mt-3">
      <button class="btn btn-success btn-block" @click="iniciarLigaFechas">Iniciar Liga</button>
    </div>
  </b-modal>
</template>

<script>
import axios from 'axios';
import { BModal } from 'bootstrap-vue-3';

export default {
  name: "Navbar",
  components: {
    BModal,
  },
  data() {
    return {
      menuItems: [
        {
          name: 'Configuración',
          id: 'perfilDropdown',
          subItems: [
            // { to: '/login', name: 'Iniciar sesión' },
            // { to: '/', name: 'Cerrar sesión', action: 'cerrarSesion' },
            { to: '/crud-usuario', name: 'Gestión de usuarios' }
          ]
        },
        {
          name: 'Gestión de la liga',
          id: 'gestionLigaDropdown',
          subItems: [
            { to: '/crud-estadio', name: 'Estadios' },
            { to: '/crud-equipo', name: 'Equipos' },
            { to: '/crud-partido', name: 'Partidos' },
            { to: '/crud-futbolista', name: 'Futbolistas' },
            { to: '#', name: 'Comenzar la liga', action: 'iniciarLiga' },
            { to: '#', name: 'Culminar la liga', action: 'culminarLiga' }
          ]
        },
        {
          name: 'Reportes',
          id: 'reportesDropdown',
          subItems: [
            { to: '/tabla-posiciones', name: 'Tabla de posiciones de la liga' },
            { to: '/partidos-por-equipos', name: 'Partidos por equipos' },
            { to: '/partidos-por-fecha', name: 'Partidos jugados por fecha' },
            { to: '/estadios-mayor-audiencia', name: 'Estadios con mayor audiencia' },
            // { to: '/estado-equipo', name: 'Estado de un equipo' },
          ]
        }
      ],
      usuarioActual: localStorage.getItem('usuario'),
      rolUsuario: localStorage.getItem('rol'),
      showLigaModal: false,
      fechaInicio: '',
      fechaFin: '',
    };
  },
  computed: {
    filteredMenuItems() {
      return this.menuItems.filter(item => this.shouldShowMenu(item.name));
    }
  },
  methods: {
    handleMenuItemClick(action) {
      if (action === 'cerrarSesion') {
        this.cerrarSesion();
      } else if (action === 'iniciarLiga') {
        this.showLigaModal = true;
      } else if (action === 'culminarLiga') {
        this.$emit('culminarLiga');
      }
    },
    shouldShowMenu(menuName) {
      if (menuName === 'Gestión de la liga') {
        return this.rolUsuario === 'GESTOR';
      } else if (menuName === 'Configuración') {
        return this.rolUsuario === 'ADMINISTRADOR';
      }
      return true;
    },
    cerrarSesion() {
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      this.usuarioActual = null;
      this.rolUsuario = null;
      this.$router.push('/');
    },
    iniciarSesion() {
      this.$router.push('/login');
    },
    async iniciarLigaFechas() {
      if (new Date(this.fechaInicio) >= new Date(this.fechaFin)) {
        alert('La fecha de fin debe ser posterior a la fecha de inicio.');
        return;
      }
      try {
        await axios.post('http://localhost:3000/liga/iniciar', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin,
        });
        alert('Liga iniciada correctamente.');
        this.showLigaModal = false;
      } catch (error) {
        console.error('Error iniciando la liga:', error);
        alert('Error iniciando la liga.');
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
  color: white;
}
.navbar-brand {
  margin-left: 15px;
}
.dropdown-menu {
  display: none;
}
.dropdown-menu.show {
  display: block;
}
</style>
