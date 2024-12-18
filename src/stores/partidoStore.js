import { defineStore } from 'pinia';

export const usePartidoStore = defineStore('partidoStore', {
  state: () => ({
    partidos: []
  }),
  actions: {
    agregarPartido(partido) {
      this.partidos.push(partido);
    },
    editarPartido(index, partido) {
      this.partidos[index] = partido;
    },
    eliminarPartido(index) {
      this.partidos.splice(index, 1);
    },
  }
});