import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../common/api';

export const usePartidoStore = defineStore('partido', () => {
  const partidos = ref([]);

  const cargarPartidos = async () => {
    try {
      partidos.value = await api.get('/partidos');
    } catch (error) {
      console.error('Error al cargar partidos:', error);
    }
  };

  const agregarPartido = async (partido) => {
    try {
      const payload = {
        audiencia: Number(partido.audiencia),
        fecha: new Date(partido.fecha).toISOString(),
        fkestadio: Number(partido.fkestadio),
        local: Number(partido.local),
        visitante: Number(partido.visitante),
        goles_local: Number(partido.goles_local),
        goles_visitante: Number(partido.goles_visitante),
      };
      const nuevo = await api.post('/partidos', payload);
      await cargarPartidos();
      return nuevo;
    } catch (error) {
      console.error('Error al agregar partido:', error);
      throw error;
    }
  };

  const actualizarPartido = async (idpartido, partido) => {
    try {
      const payload = {
        audiencia: Number(partido.audiencia),
        fecha: new Date(partido.fecha).toISOString(),
        fkestadio: Number(partido.fkestadio),
        local: Number(partido.local),
        visitante: Number(partido.visitante),
        goles_local: Number(partido.goles_local),
        goles_visitante: Number(partido.goles_visitante),
      };
      const actualizado = await api.put(`/partidos/${idpartido}`, payload);
      await cargarPartidos();
      return actualizado;
    } catch (error) {
      console.error('Error al actualizar partido:', error);
      throw error;
    }
  };

  const eliminarPartido = async (idpartido) => {
    try {
      await api.delete(`/partidos/${idpartido}`);
      partidos.value = partidos.value.filter(p => p.idpartido !== idpartido);
    } catch (error) {
      console.error('Error al eliminar partido:', error);
      throw error;
    }
  };

  return {
    partidos,
    cargarPartidos,
    agregarPartido,
    actualizarPartido,
    eliminarPartido,
  };
});
