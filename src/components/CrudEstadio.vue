<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Gestión de Estadios</h1>
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="agregarEstadio" class="d-flex flex-column">
            <div class="form-group mb-3">
              <label for="nombre">Nombre</label>
              <input type="text" class="form-control" id="nombre" v-model="nuevoEstadio.nombre" required />
            </div>
            <div class="form-group mb-3">
              <label for="capacidad">Capacidad</label>
              <input type="number" class="form-control" id="capacidad" v-model="nuevoEstadio.capacidad" required />
            </div>
            <div class="d-flex justify-content-start">
              <button type="submit" class="btn btn-success me-2">
                {{ isEditing ? 'Actualizar' : 'Agregar' }}
              </button>
              <button type="button" class="btn btn-secondary me-2" v-if="isEditing" @click="cancelarEdicion">Cancelar</button>
              <button type="button" class="btn btn-danger" v-if="selectedEstadio !== null" @click="eliminarEstadio">Eliminar</button>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <Table :headers="tableHeaders" :rows="formattedEstadios" @select="seleccionarEstadio" :selected="selectedEstadio" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useEstadioStore } from '../stores/estadioStore';
import Navbar from '../common/Navbar.vue';
import Table from '../common/Table.vue';

export default {
  components: { Navbar, Table },
  setup() {
    const estadioStore = useEstadioStore();
    const nuevoEstadio = ref({ nombre: '', capacidad: '' });
    const isEditing = ref(false);
    const selectedEstadio = ref(null);
    const currentIndex = ref(null);

    const agregarEstadio = () => {
      if (isEditing.value) {
        estadioStore.actualizarEstadio(currentIndex.value, nuevoEstadio.value.nombre, nuevoEstadio.value.capacidad);
        isEditing.value = false;
      } else {
        estadioStore.agregarEstadio(nuevoEstadio.value.nombre, nuevoEstadio.value.capacidad);
      }
      nuevoEstadio.value.nombre = '';
      nuevoEstadio.value.capacidad = '';
      selectedEstadio.value = null;
    };

    const seleccionarEstadio = (index) => {
      selectedEstadio.value = index;
      const estadio = estadioStore.estadios[selectedEstadio.value];
      nuevoEstadio.value.nombre = estadio.nombre;
      nuevoEstadio.value.capacidad = estadio.capacidad;
      isEditing.value = true;
      currentIndex.value = selectedEstadio.value;
    };

    const eliminarEstadio = () => {
      estadioStore.eliminarEstadio(selectedEstadio.value);
      selectedEstadio.value = null;
      isEditing.value = false;
      nuevoEstadio.value.nombre = '';
      nuevoEstadio.value.capacidad = '';
    };

    const cancelarEdicion = () => {
      isEditing.value = false;
      nuevoEstadio.value.nombre = '';
      nuevoEstadio.value.capacidad = '';
      selectedEstadio.value = null;
    };

    return {
      estadios: estadioStore.estadios,
      nuevoEstadio,
      agregarEstadio,
      eliminarEstadio,
      seleccionarEstadio,
      cancelarEdicion,
      tableHeaders: ['Nombre', 'Capacidad'],
      formattedEstadios: computed(() =>
        estadioStore.estadios.map((estadio) => [estadio.nombre, estadio.capacidad])
      ),
      isEditing,
      selectedEstadio
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
