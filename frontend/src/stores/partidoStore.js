import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const usePartidoStore = defineStore('partido', () => {
  const partidos = ref(loadPartidos());

  const agregarPartido = (partido) => {
    partidos.value.push(partido);
    savePartidos();
  };

  const actualizarPartido = (index, partido) => {
    partidos.value[index] = partido;
    savePartidos();
  };

  const eliminarPartido = (index) => {
    partidos.value.splice(index, 1);
    savePartidos();
  };

  function savePartidos() {
    localStorage.setItem('partidos', JSON.stringify(partidos.value));
  }

  function loadPartidos() {
    const savedPartidos = localStorage.getItem('partidos');
    return savedPartidos ? JSON.parse(savedPartidos) : [];
  }

  watch(partidos, savePartidos, { deep: true });

  return {
    partidos,
    agregarPartido,
    actualizarPartido,
    eliminarPartido,
  };
});
