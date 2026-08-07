<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Bienvenido al Sistema de Gestión de la Liga Nacional de Fútbol</h1>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Navbar from '../common/Navbar.vue';

export default {
  components: { Navbar },
  setup() {
    const usuarioActual = ref('admin');

    const actualizarEstadoUsuario = () => {
      if (usuarioActual.value) {
        document.getElementById('usuarioActual').textContent = `Usuario: ${usuarioActual.value}`;
        document.getElementById('iniciarSesion').style.display = 'none';
        document.getElementById('cerrarSesion').style.display = 'block';
      } else {
        document.getElementById('usuarioActual').textContent = '';
        document.getElementById('iniciarSesion').style.display = 'block';
        document.getElementById('cerrarSesion').style.display = 'none';
      }
    };

    onMounted(() => {
      actualizarEstadoUsuario();
    });

    return {
      usuarioActual
    };
  },
};
</script>

<style scoped>
.main-container {
  margin-top: 50px;
}

body {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.content {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
}
</style>
