import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../common/api';

export const useUsuarioStore = defineStore('usuario', () => {
  const usuarios = ref([]);

  const cargarUsuarios = async () => {
    try {
      usuarios.value = await api.get('/usuarios');
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const agregarUsuario = async (usuario) => {
    try {
      const payload = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password,
        rol: usuario.rol,
      };
      const nuevo = await api.post('/usuarios', payload);
      usuarios.value.push(nuevo);
      return nuevo;
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      throw error;
    }
  };

  const actualizarUsuario = async (id, usuario) => {
    try {
      const payload = {
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      };
      // Solo enviar contraseña si fue modificada
      if (usuario.password) {
        payload.password = usuario.password;
      }
      const actualizado = await api.put(`/usuarios/${id}`, payload);
      const index = usuarios.value.findIndex(u => u.id === id);
      if (index !== -1) {
        usuarios.value[index] = actualizado;
      }
      return actualizado;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      usuarios.value = usuarios.value.filter(u => u.id !== id);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  };

  return {
    usuarios,
    cargarUsuarios,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
  };
});
