<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  async mounted() {
    // Comprobar si la liga está en proceso
    try {
      const response = await axios.get('http://localhost:3000/liga/fechas');
      const fechaActual = new Date();
      if (response.data.length > 0) {
        const { fechaInicio, fechaFin } = response.data[0];
        if (new Date(fechaInicio) <= fechaActual && fechaActual <= new Date(fechaFin)) {
          console.log('La liga está en proceso.');
        } else {
          console.log('La liga no está en proceso.');
        }
      } else {
        console.log('No hay fechas de liga registradas.');
      }
    } catch (error) {
      console.error('Error comprobando las fechas de la liga:', error);
    }
  }
};
</script>

<style scoped>
</style>
