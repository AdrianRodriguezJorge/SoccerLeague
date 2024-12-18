<script setup>
import { useEstadioStore } from '../stores/estadioStore';
const estadioStore = useEstadioStore();
</script>

<template>
  <form>
    <label for="estadio">Estadio</label>
    <select id="estadio">
      <option v-for="(estadio, index) in estadioStore.estadios" :key="index">
        {{ estadio.nombre }}
      </option>
    </select>
  </form>
</template>