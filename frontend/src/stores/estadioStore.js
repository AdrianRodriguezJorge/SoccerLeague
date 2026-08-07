import { defineStore } from 'pinia';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useEstadioStore = defineStore('estadio', {
  state: () => ({
    estadios: [],
  }),
  actions: {
    async fetchEstadios() {
      try {
        const response = await apiClient.get('/estadios');
        this.estadios = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addEstadio(estadio) {
      try {
        const response = await apiClient.post('/estadios', estadio);
        this.estadios.push(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateEstadio(id, estadio) {
      try {
        console.log("updateEstadio - id: ", id);
        const response = await apiClient.put(`/estadios/${id}`, estadio);
        const index = this.estadios.findIndex((e) => e.idestadio === id);
        if (index !== -1) {
          this.estadios[index] = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async removeEstadio(id) {
      try {
        console.log("removeEstadio - id: ", id);
        await apiClient.delete(`/estadios/${id}`);
        console.log("después de llamar al apiClient");
        this.estadios = this.estadios.filter((e) => e.idestadio !== id);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
