import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useUsuarioStore = defineStore('usuario', () => {
  const usuarios = ref(loadUsuarios());

  const agregarUsuario = (usuario) => {
    usuarios.value.push(usuario);
    saveUsuarios();
  };

  const actualizarUsuario = (index, usuario) => {
    usuarios.value[index] = usuario;
    saveUsuarios();
  };

  const eliminarUsuario = (index) => {
    usuarios.value.splice(index, 1);
    saveUsuarios();
  };

  function saveUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios.value));
  }

  function loadUsuarios() {
    const savedUsuarios = localStorage.getItem('usuarios');
    return savedUsuarios ? JSON.parse(savedUsuarios) : [];
  }

  watch(usuarios, saveUsuarios, { deep: true });

  return {
    usuarios,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
  };
});
