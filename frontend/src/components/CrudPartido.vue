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
              <select class="form-control" id="estadio" v-model="nuevoPartido.fkestadio" required>
                <option v-for="estadio in estadios" :key="estadio.idestadio" :value="estadio.idestadio">
                  {{ estadio.nomestadio }}
                </option>
              </select>
            </div>
            <div class="form-group mb-3">
              <label for="audiencia">Audiencia</label>
              <input type="number" class="form-control" id="audiencia" v-model="nuevoPartido.audiencia" min="0" required />
            </div>
            <div class="form-group mb-3">
              <label for="local">Equipo Local</label>
              <select class="form-control" id="local" v-model="nuevoPartido.local" required>
                <option v-for="equipo in equipos" :key="equipo.idequipo" :value="equipo.idequipo">
                  {{ equipo.nomequipo }}
                </option>
              </select>
            </div>
            <div class="form-group mb-3">
              <label for="visitante">Equipo Visitante</label>
              <select class="form-control" id="visitante" v-model="nuevoPartido.visitante" required>
                <option v-for="equipo in equipos" :key="equipo.idequipo" :value="equipo.idequipo">
                  {{ equipo.nomequipo }}
                </option>
              </select>
            </div>
            <div class="form-group mb-3">
              <label for="golesLocal">Goles del Equipo Local</label>
              <input type="number" class="form-control" id="golesLocal" v-model="nuevoPartido.goles_local" min="0" required />
            </div>
            <div class="form-group mb-3">
              <label for="golesVisitante">Goles del Equipo Visitante</label>
              <input type="number" class="form-control" id="golesVisitante" v-model="nuevoPartido.goles_visitante" min="0" required />
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
import { ref, computed, onMounted } from 'vue';
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
      fkestadio: '',
      audiencia: 0,
      local: '',
      visitante: '',
      goles_local: 0,
      goles_visitante: 0
    });

    const isEditing = ref(false);
    const selectedPartido = ref(null);
    const currentIndex = ref(null);

    onMounted(async () => {
      await partidoStore.cargarPartidos();
      await equipoStore.cargarEquipos();
      await estadioStore.cargarEstadios();
    });

    const agregarPartido = async () => {
      try {
        if (isEditing.value) {
          const partido = partidoStore.partidos[currentIndex.value];
          await partidoStore.actualizarPartido(partido.idpartido, nuevoPartido.value);
          isEditing.value = false;
        } else {
          await partidoStore.agregarPartido(nuevoPartido.value);
        }
        resetForm();
      } catch (err) {
        alert('Error al guardar partido: ' + err.message);
      }
    };

    const seleccionarPartido = (index) => {
      selectedPartido.value = index;
      const partido = partidoStore.partidos[selectedPartido.value];
      
      // Formatear fecha para datetime-local
      let formattedFecha = '';
      if (partido.fecha) {
        const dateObj = new Date(partido.fecha);
        // Ajustar zona horaria local a ISO string
        const offset = dateObj.getTimezoneOffset();
        const localDate = new Date(dateObj.getTime() - (offset * 60 * 1000));
        formattedFecha = localDate.toISOString().slice(0, 16);
      }

      nuevoPartido.value = {
        fecha: formattedFecha,
        fkestadio: partido.fkestadio,
        audiencia: partido.audiencia,
        local: partido.local,
        visitante: partido.visitante,
        goles_local: partido.goles_local,
        goles_visitante: partido.goles_visitante
      };

      isEditing.value = true;
      currentIndex.value = selectedPartido.value;
    };

    const eliminarPartido = async () => {
      try {
        const partido = partidoStore.partidos[selectedPartido.value];
        await partidoStore.eliminarPartido(partido.idpartido);
        resetForm();
      } catch (err) {
        alert('Error al eliminar partido: ' + err.message);
      }
    };

    const cancelarEdicion = () => {
      resetForm();
    };

    const resetForm = () => {
      nuevoPartido.value = {
        fecha: '',
        fkestadio: estadioStore.estadios[0]?.idestadio || '',
        audiencia: 0,
        local: equipoStore.equipos[0]?.idequipo || '',
        visitante: equipoStore.equipos[1]?.idequipo || '',
        goles_local: 0,
        goles_visitante: 0
      };
      isEditing.value = false;
      selectedPartido.value = null;
    };

    const formatFechaLegible = (fechaStr) => {
      if (!fechaStr) return '';
      const date = new Date(fechaStr);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
          formatFechaLegible(partido.fecha),
          partido.estadio ? partido.estadio.nomestadio : 'Desconocido',
          partido.audiencia,
          partido.equipoLocal ? partido.equipoLocal.nomequipo : 'Desconocido',
          partido.equipoVisitante ? partido.equipoVisitante.nomequipo : 'Desconocido',
          partido.goles_local,
          partido.goles_visitante
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
</style>
