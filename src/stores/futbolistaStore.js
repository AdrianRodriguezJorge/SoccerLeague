import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useFutbolistaStore = defineStore('futbolista', () => {
  const futbolistas = ref(loadFutbolistas());

  const agregarFutbolista = (futbolista) => {
    futbolistas.value.push(futbolista);
    saveFutbolistas();
  };

  const actualizarFutbolista = (index, futbolista) => {
    futbolistas.value[index] = futbolista;
    saveFutbolistas();
  };

  const eliminarFutbolista = (index) => {
    futbolistas.value.splice(index, 1);
    saveFutbolistas();
  };

  function saveFutbolistas() {
    localStorage.setItem('futbolistas', JSON.stringify(futbolistas.value));
  }

  function loadFutbolistas() {
    const savedFutbolistas = localStorage.getItem('futbolistas');
    return savedFutbolistas ? JSON.parse(savedFutbolistas) : [];
  }

  watch(futbolistas, saveFutbolistas, { deep: true });

  return {
    futbolistas,
    agregarFutbolista,
    actualizarFutbolista,
    eliminarFutbolista,
  };
});
