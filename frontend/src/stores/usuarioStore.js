import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

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

export const useUsuarioStore = defineStore('usuario', () => {
  const usuarios = ref([]);

  const fetchUsuarios = async () => {
    try {
      const response = await apiClient.get('/usuarios');
      usuarios.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const agregarUsuario = async (usuario) => {
    try {
      const response = await apiClient.post('/usuarios', usuario);
      usuarios.value.push(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarUsuario = async (id, usuario) => {
    try {
      const response = await apiClient.put(`/usuarios/${id}`, usuario);
      const index = usuarios.value.findIndex((u) => u.id === id);
      if (index !== -1) {
        usuarios.value[index] = response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await apiClient.delete(`/usuarios/${id}`);
      usuarios.value = usuarios.value.filter((u) => u.id !== id);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    usuarios,
    fetchUsuarios,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
  };
});
