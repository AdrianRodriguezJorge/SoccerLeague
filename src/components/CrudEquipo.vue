<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Gestión de Equipos</h1>
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="agregarEquipo" class="d-flex flex-column">
            <div class="form-group mb-3">
              <label for="nombre">Nombre</label>
              <input type="text" class="form-control" id="nombre" v-model="nuevoEquipo.nombre" required />
            </div>
            <div class="form-group mb-3">
              <label for="provincia">Provincia</label>
              <input type="text" class="form-control" id="provincia" v-model="nuevoEquipo.provincia" required />
            </div>
            <div class="form-group mb-3">
              <label for="campParticip">Campeonatos Participados</label>
              <input type="number" class="form-control" id="campParticip" v-model="nuevoEquipo.campParticip" min="0" required />
            </div>
            <div class="form-group mb-3">
              <label for="campGanados">Campeonatos Ganados</label>
              <input type="number" class="form-control" id="campGanados" v-model="nuevoEquipo.campGanados" min="0" required />
            </div>
            <div class="form-group mb-3">
              <label for="mascota">Mascota</label>
              <input type="text" class="form-control" id="mascota" v-model="nuevoEquipo.mascota" required />
            </div>
            <div class="form-group mb-3">
              <label for="color">Color</label>
              <input type="text" class="form-control" id="color" v-model="nuevoEquipo.color" required />
            </div>
            <div class="form-group mb-3">
              <label for="puntos">Puntos</label>
              <input type="number" class="form-control" id="puntos" v-model="nuevoEquipo.puntos" min="0" required />
            </div>
            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-success me-2">
                {{ isEditing ? 'Actualizar' : 'Agregar' }}
              </button>
              <button type="button" class="btn btn-secondary me-2" v-if="isEditing" @click="cancelarEdicion">Cancelar</button>
              <button type="button" class="btn btn-danger" v-if="selectedEquipo !== null" @click="eliminarEquipo">Eliminar</button>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <Table :headers="tableHeaders" :rows="formattedEquipos" @select="seleccionarEquipo" :selected="selectedEquipo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useEquipoStore } from '../stores/equipoStore';
import Navbar from '../common/Navbar.vue';
import Table from '../common/Table.vue';

export default {
  components: { Navbar, Table },
  setup() {
    const equipoStore = useEquipoStore();
    const nuevoEquipo = ref({
      nombre: '',
      provincia: '',
      campParticip: 0,
      campGanados: 0,
      mascota: '',
      color: '',
      puntos: 0
    });
    const isEditing = ref(false);
    const selectedEquipo = ref(null);
    const currentIndex = ref(null);

    const agregarEquipo = () => {
      if (isEditing.value) {
        equipoStore.actualizarEquipo(currentIndex.value, nuevoEquipo.value);
        isEditing.value = false;
      } else {
        equipoStore.agregarEquipo(nuevoEquipo.value);
      }
      resetForm();
    };

    const seleccionarEquipo = (index) => {
      selectedEquipo.value = index;
      const equipo = equipoStore.equipos[selectedEquipo.value];
      nuevoEquipo.value = { ...equipo };
      isEditing.value = true;
      currentIndex.value = selectedEquipo.value;
    };

    const eliminarEquipo = () => {
      equipoStore.eliminarEquipo(selectedEquipo.value);
      resetForm();
    };

    const cancelarEdicion = () => {
      resetForm();
    };

    const resetForm = () => {
      nuevoEquipo.value = {
        nombre: '',
        provincia: '',
        campParticip: 0,
        campGanados: 0,
        mascota: '',
        color: '',
        puntos: 0
      };
      isEditing.value = false;
      selectedEquipo.value = null;
    };

    return {
      equipos: equipoStore.equipos,
      nuevoEquipo,
      agregarEquipo,
      eliminarEquipo,
      seleccionarEquipo,
      cancelarEdicion,
      tableHeaders: ['Nombre', 'Provincia', 'Campeonatos Participados', 'Campeonatos Ganados', 'Mascota', 'Color', 'Puntos'],
      formattedEquipos: computed(() =>
        equipoStore.equipos.map(equipo => [
          equipo.nombre,
          equipo.provincia,
          equipo.campParticip,
          equipo.campGanados,
          equipo.mascota,
          equipo.color,
          equipo.puntos
        ])
      ),
      isEditing,
      selectedEquipo
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
