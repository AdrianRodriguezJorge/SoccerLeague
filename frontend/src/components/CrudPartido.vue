<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Gestión de Partidos</h1>
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="agregarPartido" class="d-flex flex-column">
            <div class="form-group mb-3">
              <label for="fecha">Fecha</label>
              <input type="datetime-local" class="form-control" id="fecha" v-model="nuevoPartido.fecha" required />
            </div>
            <div class="form-group mb-3">
              <label for="estadio">Estadio</label>
              <select class="form-control" id="estadio" v-model="nuevoPartido.estadio" required>
                <option v-for="estadio in estadios" :key="estadio.nombre" :value="estadio.nombre">{{ estadio.nombre }}</option>
              </select>
            </div>
            <div class="form-group mb-3">
              <label for="audiencia">Audiencia</label>
              <input type="number" class="form-control" id="audiencia" v-model="nuevoPartido.audiencia" min="0" required />
            </div>
            <div class="form-group mb-3">
              <label for="local">Equipo Local</label>
              <select class="form-control" id="local" v-model="nuevoPartido.local" required>
                <option v-for="equipo in equipos" :key="equipo.nombre" :value="equipo.nombre">{{ equipo.nombre }}</option>
              </select>
            </div>
            <div class="form-group mb-3">
              <label for="visitante">Equipo Visitante</label>
              <select class="form-control" id="visitante" v-model="nuevoPartido.visitante" required>
                <option v-for="equipo in equipos" :key="equipo.nombre" :value="equipo.nombre">{{ equipo.nombre }}</option>
              </select>
            </div>
            <div class="form-group mb-3">
              <label for="golesLocal">Goles del Equipo Local</label>
              <input type="number" class="form-control" id="golesLocal" v-model="nuevoPartido.golesLocal" min="0" required />
            </div>
            <div class="form-group mb-3">
              <label for="golesVisitante">Goles del Equipo Visitante</label>
              <input type="number" class="form-control" id="golesVisitante" v-model="nuevoPartido.golesVisitante" min="0" required />
            </div>
            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-success me-2">
                {{ isEditing ? 'Actualizar' : 'Agregar' }}
              </button>
              <button type="button" class="btn btn-secondary me-2" v-if="isEditing" @click="cancelarEdicion">Cancelar</button>
              <button type="button" class="btn btn-danger" v-if="selectedPartido !== null" @click="eliminarPartido">Eliminar</button>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <Table :headers="tableHeaders" :rows="formattedPartidos" @select="seleccionarPartido" :selected="selectedPartido" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { usePartidoStore } from '../stores/partidoStore';
import { useEquipoStore } from '../stores/equipoStore';
import { useEstadioStore } from '../stores/estadioStore';
import Navbar from '../common/Navbar.vue';
import Table from '../common/Table.vue';

export default {
  components: { Navbar, Table },
  setup() {
    const partidoStore = usePartidoStore();
    const equipoStore = useEquipoStore();
    const estadioStore = useEstadioStore();
    const nuevoPartido = ref({
      fecha: '',
      estadio: '',
      audiencia: 0,
      local: '',
      visitante: '',
      golesLocal: 0,
      golesVisitante: 0
    });
    const isEditing = ref(false);
    const selectedPartido = ref(null);
    const currentIndex = ref(null);

    const agregarPartido = () => {
      if (isEditing.value) {
        partidoStore.actualizarPartido(currentIndex.value, nuevoPartido.value);
        isEditing.value = false;
      } else {
        partidoStore.agregarPartido(nuevoPartido.value);
      }
      resetForm();
    };

    const seleccionarPartido = (index) => {
      selectedPartido.value = index;
      const partido = partidoStore.partidos[selectedPartido.value];
      nuevoPartido.value = { ...partido };
      isEditing.value = true;
      currentIndex.value = selectedPartido.value;
    };

    const eliminarPartido = () => {
      partidoStore.eliminarPartido(selectedPartido.value);
      resetForm();
    };

    const cancelarEdicion = () => {
      resetForm();
    };

    const resetForm = () => {
      nuevoPartido.value = {
        fecha: '',
        estadio: '',
        audiencia: 0,
        local: '',
        visitante: '',
        golesLocal: 0,
        golesVisitante: 0
      };
      isEditing.value = false;
      selectedPartido.value = null;
    };

    return {
      partidos: partidoStore.partidos,
      equipos: equipoStore.equipos,
      estadios: estadioStore.estadios,
      nuevoPartido,
      agregarPartido,
      eliminarPartido,
      seleccionarPartido,
      cancelarEdicion,
      tableHeaders: ['Fecha', 'Estadio', 'Audiencia', 'Equipo Local', 'Equipo Visitante', 'Goles Local', 'Goles Visitante'],
      formattedPartidos: computed(() =>
        partidoStore.partidos.map(partido => [
          partido.fecha,
          partido.estadio,
          partido.audiencia,
          partido.local,
          partido.visitante,
          partido.golesLocal,
          partido.golesVisitante
        ])
      ),
      isEditing,
      selectedPartido
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
