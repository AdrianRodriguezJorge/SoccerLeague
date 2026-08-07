import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../common/api';

export const useFutbolistaStore = defineStore('futbolista', () => {
  const futbolistas = ref([]);

  const cargarFutbolistas = async () => {
    try {
      futbolistas.value = await api.get('/futbolistas');
    } catch (error) {
      console.error('Error al cargar futbolistas:', error);
    }
  };

  const agregarFutbolista = async (futbolista) => {
    try {
      const payload = {
        idequipo: Number(futbolista.idequipo),
        nombre: futbolista.nombre,
        numero: Number(futbolista.numero),
        añosenequipo: Number(futbolista.añosenequipo),
        tipo: futbolista.tipo,
      };
      const nuevo = await api.post('/futbolistas', payload);
      // Recargar para traer los datos relacionados con el equipo
      await cargarFutbolistas();
      return nuevo;
    } catch (error) {
      console.error('Error al agregar futbolista:', error);
      throw error;
    }
  };

  const actualizarFutbolista = async (idfutbolista, futbolista) => {
    try {
      const payload = {
        idequipo: Number(futbolista.idequipo),
        nombre: futbolista.nombre,
        numero: Number(futbolista.numero),
        añosenequipo: Number(futbolista.añosenequipo),
        tipo: futbolista.tipo,
      };
      const actualizado = await api.put(`/futbolistas/${idfutbolista}`, payload);
      // Recargar para traer los datos relacionados con el equipo
      await cargarFutbolistas();
      return actualizado;
    } catch (error) {
      console.error('Error al actualizar futbolista:', error);
      throw error;
    }
  };

  const eliminarFutbolista = async (idfutbolista) => {
    try {
      await api.delete(`/futbolistas/${idfutbolista}`);
      futbolistas.value = futbolistas.value.filter(f => f.idfutbolista !== idfutbolista);
    } catch (error) {
      console.error('Error al eliminar futbolista:', error);
      throw error;
    }
  };

  return {
    futbolistas,
    cargarFutbolistas,
    agregarFutbolista,
    actualizarFutbolista,
    eliminarFutbolista,
  };
});
