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
    const usuarioActual = ref(localStorage.getItem('usuario') || 'admin'); // Obtener el usuario actual del localStorage

    onMounted(() => {
      if (usuarioActual.value) {
        console.log(`Usuario actual: ${usuarioActual.value}`);
      }
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
  text-align: center; /* Centramos el texto */
}

body {
  background-image: url('/src/assets/page.jpg'); /* Ruta de la imagen */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.content {
  /* background: rgba(255, 255, 255, 0.8); */
  padding: 20px;
  border-radius: 10px;
}
</style>
