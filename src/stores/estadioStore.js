import { defineStore } from 'pinia';

export const useEstadioStore = defineStore('estadioStore', {
  state: () => ({
    estadios: []
  }),
  actions: {
    agregarEstadio(nombre, capacidad) {
      this.estadios.push({ nombre, capacidad });
    },
    editarEstadio(index, nombre, capacidad) {
      this.estadios[index] = { nombre, capacidad };
    },
    eliminarEstadio(index) {
      this.estadios.splice(index, 1);
    },
  }
});