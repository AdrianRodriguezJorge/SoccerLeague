import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../common/api';

export const useEquipoStore = defineStore('equipo', () => {
  const equipos = ref([]);

  const cargarEquipos = async () => {
    try {
      equipos.value = await api.get('/equipos');
    } catch (error) {
      console.error('Error al cargar equipos:', error);
    }
  };

  const agregarEquipo = async (equipo) => {
    try {
      const payload = {
        nomequipo: equipo.nomequipo,
        provincia: equipo.provincia,
        camparticip: Number(equipo.camparticip),
        campganados: Number(equipo.campganados),
        mascota: equipo.mascota,
        color: equipo.color,
        puntos: Number(equipo.puntos),
      };
      const nuevo = await api.post('/equipos', payload);
      equipos.value.push(nuevo);
      return nuevo;
    } catch (error) {
      console.error('Error al agregar equipo:', error);
      throw error;
    }
  };

  const actualizarEquipo = async (idequipo, equipo) => {
    try {
      const payload = {
        nomequipo: equipo.nomequipo,
        provincia: equipo.provincia,
        camparticip: Number(equipo.camparticip),
        campganados: Number(equipo.campganados),
        mascota: equipo.mascota,
        color: equipo.color,
        puntos: Number(equipo.puntos),
      };
      const actualizado = await api.put(`/equipos/${idequipo}`, payload);
      const index = equipos.value.findIndex(e => e.idequipo === idequipo);
      if (index !== -1) {
        equipos.value[index] = actualizado;
      }
      return actualizado;
    } catch (error) {
      console.error('Error al actualizar equipo:', error);
      throw error;
    }
  };

  const eliminarEquipo = async (idequipo) => {
    try {
      await api.delete(`/equipos/${idequipo}`);
      equipos.value = equipos.value.filter(e => e.idequipo !== idequipo);
    } catch (error) {
      console.error('Error al eliminar equipo:', error);
      throw error;
    }
  };

  return {
    equipos,
    cargarEquipos,
    agregarEquipo,
    actualizarEquipo,
    eliminarEquipo,
  };
});
