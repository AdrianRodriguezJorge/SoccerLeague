<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Bienvenido al Sistema de Gestión de la Liga Nacional de Fútbol</h1>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  components: { Navbar }
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
