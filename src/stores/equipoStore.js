import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useEquipoStore = defineStore('equipo', () => {
  const equipos = ref(loadEquipos());

  const agregarEquipo = (equipo) => {
    equipos.value.push(equipo);
    saveEquipos();
  };

  const actualizarEquipo = (index, equipo) => {
    equipos.value[index] = equipo;
    saveEquipos();
  };

  const eliminarEquipo = (index) => {
    equipos.value.splice(index, 1);
    saveEquipos();
  };

  function saveEquipos() {
    localStorage.setItem('equipos', JSON.stringify(equipos.value));
  }

  function loadEquipos() {
    const savedEquipos = localStorage.getItem('equipos');
    return savedEquipos ? JSON.parse(savedEquipos) : [];
  }

  watch(equipos, saveEquipos, { deep: true });

  return {
    equipos,
    agregarEquipo,
    actualizarEquipo,
    eliminarEquipo,
  };
});
