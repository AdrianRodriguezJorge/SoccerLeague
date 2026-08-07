import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../common/api';

export const useEstadioStore = defineStore('estadio', () => {
  const estadios = ref([]);

  const cargarEstadios = async () => {
    try {
      estadios.value = await api.get('/estadios');
    } catch (error) {
      console.error('Error al cargar estadios:', error);
    }
  };

  const agregarEstadio = async (nomestadio, capacidad) => {
    try {
      const nuevo = await api.post('/estadios', { nomestadio, capacidad: Number(capacidad) });
      estadios.value.push(nuevo);
      return nuevo;
    } catch (error) {
      console.error('Error al agregar estadio:', error);
      throw error;
    }
  };

  const actualizarEstadio = async (idestadio, nomestadio, capacidad) => {
    try {
      const actualizado = await api.put(`/estadios/${idestadio}`, { nomestadio, capacidad: Number(capacidad) });
      const index = estadios.value.findIndex(e => e.idestadio === idestadio);
      if (index !== -1) {
        estadios.value[index] = actualizado;
      }
      return actualizado;
    } catch (error) {
      console.error('Error al actualizar estadio:', error);
      throw error;
    }
  };

  const eliminarEstadio = async (idestadio) => {
    try {
      await api.delete(`/estadios/${idestadio}`);
      estadios.value = estadios.value.filter(e => e.idestadio !== idestadio);
    } catch (error) {
      console.error('Error al eliminar estadio:', error);
      throw error;
    }
  };

  return {
    estadios,
    cargarEstadios,
    agregarEstadio,
    actualizarEstadio,
    eliminarEstadio,
  };
});
