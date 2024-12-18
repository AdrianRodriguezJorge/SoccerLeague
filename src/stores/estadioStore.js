import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useEstadioStore = defineStore('estadio', () => {
  const estadios = ref(loadEstadios());

  const agregarEstadio = (nombre, capacidad) => {
    estadios.value.push({ nombre, capacidad });
    saveEstadios();
  };

  const actualizarEstadio = (index, nombre, capacidad) => {
    estadios.value[index] = { nombre, capacidad };
    saveEstadios();
  };

  const eliminarEstadio = (index) => {
    estadios.value.splice(index, 1);
    saveEstadios();
  };

  function saveEstadios() {
    localStorage.setItem('estadios', JSON.stringify(estadios.value));
  }

  function loadEstadios() {
    const savedEstadios = localStorage.getItem('estadios');
    return savedEstadios ? JSON.parse(savedEstadios) : [];
  }

  // Watcher para guardar automáticamente los cambios
  watch(estadios, saveEstadios, { deep: true });

  return {
    estadios,
    agregarEstadio,
    actualizarEstadio,
    eliminarEstadio,
  };
});
