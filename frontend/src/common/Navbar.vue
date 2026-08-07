<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/principal">Liga Nacional de Fútbol</router-link>
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
          <li class="nav-item dropdown" v-for="(item, index) in menuItems" :key="index">
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
              <template v-for="(subItem, subIndex) in item.subItems" :key="subIndex">
                <router-link
                  v-if="!subItem.action && subItem.to !== '#'"
                  :to="subItem.to"
                  class="dropdown-item"
                >
                  {{ subItem.name }}
                </router-link>
                <a
                  v-else
                  href="#"
                  class="dropdown-item"
                  @click.prevent="handleMenuItemClick(subItem.action || subItem.name)"
                >
                  {{ subItem.name }}
                </a>
              </template>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <span class="nav-link" style="color: white;">
              Usuario: {{ usuarioActual }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      menuItems: [
        {
          name: 'Perfil',
          id: 'perfilDropdown',
          subItems: [
            { to: '/', name: 'Iniciar sesión' },
            { to: '#', name: 'Cerrar sesión', action: 'Cerrar sesión' },
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
            { to: '/entrenadores-exp', name: 'Entrenadores con más experiencia' },
            { to: '/estadios-mayor-audiencia', name: 'Estadios con mayor audiencia' },
            { to: '/estado-equipo', name: 'Estado de un equipo' },
          ]
        }
      ],
      usuarioActual: null,
    };
  },
  mounted() {
    this.actualizarEstadoUsuario();
  },
  methods: {
    actualizarEstadoUsuario() {
      this.usuarioActual = localStorage.getItem('username') || 'Invitado';
    },
    handleMenuItemClick(action) {
      if (action === 'Cerrar sesión') {
        this.cerrarSesion();
      } else if (action === 'iniciarLiga') {
        this.$emit('iniciarLiga');
      } else if (action === 'culminarLiga') {
        this.$emit('culminarLiga');
      }
    },
    cerrarSesion() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('rol');
      this.usuarioActual = null;
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
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
