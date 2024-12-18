<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Gestión de Usuarios</h1>
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="agregarUsuario" class="d-flex flex-column">
            <div class="form-group mb-3">
              <label for="nombre">Nombre de Usuario</label>
              <input type="text" class="form-control" id="nombre" v-model="nuevoUsuario.nombre" required />
            </div>
            <div class="form-group mb-3">
              <label for="contraseña">Contraseña</label>
              <input type="password" class="form-control" id="contraseña" v-model="nuevoUsuario.contraseña" required />
            </div>
            <div class="form-group mb-3">
              <label for="rol">Rol</label>
              <select class="form-control" id="rol" v-model="nuevoUsuario.rol" required>
                <option value="gestor_liga">Gestor de Liga</option>
                <option value="gestor_usuario">Gestor de Usuarios</option>
              </select>
            </div>
            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-success me-2">
                {{ isEditing ? 'Actualizar' : 'Agregar' }}
              </button>
              <button type="button" class="btn btn-secondary me-2" v-if="isEditing" @click="cancelarEdicion">Cancelar</button>
              <button type="button" class="btn btn-danger" v-if="selectedUsuario !== null" @click="eliminarUsuario">Eliminar</button>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <Table :headers="tableHeaders" :rows="formattedUsuarios" @select="seleccionarUsuario" :selected="selectedUsuario" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useUsuarioStore } from '../stores/usuarioStore';
import Navbar from '../common/Navbar.vue';
import Table from '../common/Table.vue';

export default {
  components: { Navbar, Table },
  setup() {
    const usuarioStore = useUsuarioStore();
    const nuevoUsuario = ref({
      nombre: '',
      contraseña: '',
      rol: 'gestor_liga'
    });
    const isEditing = ref(false);
    const selectedUsuario = ref(null);
    const currentIndex = ref(null);

    const agregarUsuario = () => {
      if (isEditing.value) {
        usuarioStore.actualizarUsuario(currentIndex.value, nuevoUsuario.value);
        isEditing.value = false;
      } else {
        usuarioStore.agregarUsuario(nuevoUsuario.value);
      }
      resetForm();
    };

    const seleccionarUsuario = (index) => {
      selectedUsuario.value = index;
      const usuario = usuarioStore.usuarios[selectedUsuario.value];
      nuevoUsuario.value = { ...usuario };
      isEditing.value = true;
      currentIndex.value = selectedUsuario.value;
    };

    const eliminarUsuario = () => {
      usuarioStore.eliminarUsuario(selectedUsuario.value);
      resetForm();
    };

    const cancelarEdicion = () => {
      resetForm();
    };

    const resetForm = () => {
      nuevoUsuario.value = {
        nombre: '',
        contraseña: '',
        rol: 'gestor_liga'
      };
      isEditing.value = false;
      selectedUsuario.value = null;
    };

    return {
      usuarios: usuarioStore.usuarios,
      nuevoUsuario,
      agregarUsuario,
      eliminarUsuario,
      seleccionarUsuario,
      cancelarEdicion,
      tableHeaders: ['Nombre', 'Rol'],
      formattedUsuarios: computed(() =>
        usuarioStore.usuarios.map(usuario => [usuario.nombre, usuario.rol])
      ),
      isEditing,
      selectedUsuario
    };
  }
};
</script>

<style scoped>
.main-container {
  margin-top: 50px;
}
.table tr.selected {
  background-color: #d3d3d3;
}
</style>
