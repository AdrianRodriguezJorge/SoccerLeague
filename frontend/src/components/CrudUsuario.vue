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
              <label for="email">Correo Electrónico</label>
              <input type="email" class="form-control" id="email" v-model="nuevoUsuario.email" required />
            </div>
            <div class="form-group mb-3">
              <label for="contraseña">Contraseña <span v-if="isEditing" class="text-muted">(dejar en blanco para conservar la actual)</span></label>
              <input type="password" class="form-control" id="contraseña" v-model="nuevoUsuario.password" :required="!isEditing" />
            </div>
            <div class="form-group mb-3">
              <label for="rol">Rol</label>
              <select class="form-control" id="rol" v-model="nuevoUsuario.rol" required>
                <option value="GESTOR">Gestor de Liga</option>
                <option value="ADMINISTRADOR">Administrador</option>
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
import { ref, computed, onMounted } from 'vue';
import { useUsuarioStore } from '../stores/usuarioStore';
import Navbar from '../common/Navbar.vue';
import Table from '../common/Table.vue';

export default {
  components: { Navbar, Table },
  setup() {
    const usuarioStore = useUsuarioStore();
    const nuevoUsuario = ref({
      nombre: '',
      email: '',
      password: '',
      rol: 'GESTOR'
    });
    const isEditing = ref(false);
    const selectedUsuario = ref(null);
    const currentIndex = ref(null);

    onMounted(async () => {
      await usuarioStore.cargarUsuarios();
    });

    const agregarUsuario = async () => {
      try {
        if (isEditing.value) {
          const usuario = usuarioStore.usuarios[currentIndex.value];
          await usuarioStore.actualizarUsuario(usuario.id, nuevoUsuario.value);
          isEditing.value = false;
        } else {
          await usuarioStore.agregarUsuario(nuevoUsuario.value);
        }
        resetForm();
      } catch (err) {
        alert('Error al guardar usuario: ' + err.message);
      }
    };

    const seleccionarUsuario = (index) => {
      selectedUsuario.value = index;
      const usuario = usuarioStore.usuarios[selectedUsuario.value];
      nuevoUsuario.value = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: '',
        rol: usuario.rol
      };
      isEditing.value = true;
      currentIndex.value = selectedUsuario.value;
    };

    const eliminarUsuario = async () => {
      try {
        const usuario = usuarioStore.usuarios[selectedUsuario.value];
        await usuarioStore.eliminarUsuario(usuario.id);
        resetForm();
      } catch (err) {
        alert('Error al eliminar usuario: ' + err.message);
      }
    };

    const cancelarEdicion = () => {
      resetForm();
    };

    const resetForm = () => {
      nuevoUsuario.value = {
        nombre: '',
        email: '',
        password: '',
        rol: 'GESTOR'
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
      tableHeaders: ['Nombre', 'Email', 'Rol'],
      formattedUsuarios: computed(() =>
        usuarioStore.usuarios.map(usuario => [usuario.nombre, usuario.email, usuario.rol])
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
</style>
