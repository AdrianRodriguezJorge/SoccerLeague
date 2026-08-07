<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Gestión de Futbolistas</h1>
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="agregarFutbolista" class="d-flex flex-column">
            <div class="form-group mb-3">
              <label for="nombre">Nombre</label>
              <input type="text" class="form-control" id="nombre" v-model="nuevoFutbolista.nombre" required />
            </div>
            <div class="form-group mb-3">
              <label for="equipo">Equipo</label>
              <select class="form-control" id="equipo" v-model="nuevoFutbolista.idequipo" required>
                <option v-for="equipo in equipos" :key="equipo.idequipo" :value="equipo.idequipo">
                  {{ equipo.nomequipo }}
                </option>
              </select>
            </div>
            <div class="form-group mb-3">
              <label for="numero">Número</label>
              <input type="number" class="form-control" id="numero" v-model="nuevoFutbolista.numero" min="0" required />
            </div>
            <div class="form-group mb-3">
              <label for="añosEnEquipo">Años en el Equipo</label>
              <input type="number" class="form-control" id="añosEnEquipo" v-model="nuevoFutbolista.añosEnEquipo" min="0" required />
            </div>
            <div class="form-group mb-3">
              <label for="tipo">Posición / Rol</label>
              <select class="form-control" id="tipo" v-model="nuevoFutbolista.tipo" required>
                <option value="Delantero">Delantero</option>
                <option value="Mediocampista">Mediocampista</option>
                <option value="Defensa">Defensa</option>
                <option value="Portero">Portero</option>
                <option value="Entrenador">Entrenador</option>
              </select>
            </div>
            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-success me-2">
                {{ isEditing ? 'Actualizar' : 'Agregar' }}
              </button>
              <button type="button" class="btn btn-secondary me-2" v-if="isEditing" @click="cancelarEdicion">Cancelar</button>
              <button type="button" class="btn btn-danger" v-if="selectedFutbolista !== null" @click="eliminarFutbolista">Eliminar</button>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <Table :headers="tableHeaders" :rows="formattedFutbolistas" @select="seleccionarFutbolista" :selected="selectedFutbolista" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useFutbolistaStore } from '../stores/futbolistaStore';
import { useEquipoStore } from '../stores/equipoStore';
import Navbar from '../common/Navbar.vue';
import Table from '../common/Table.vue';

export default {
  components: { Navbar, Table },
  setup() {
    const futbolistaStore = useFutbolistaStore();
    const equipoStore = useEquipoStore();
    
    const nuevoFutbolista = ref({
      nombre: '',
      idequipo: '',
      numero: 0,
      añosEnEquipo: 0,
      tipo: 'Delantero'
    });
    
    const isEditing = ref(false);
    const selectedFutbolista = ref(null);
    const currentIndex = ref(null);

    onMounted(async () => {
      await futbolistaStore.cargarFutbolistas();
      await equipoStore.cargarEquipos();
    });

    const agregarFutbolista = async () => {
      try {
        const payload = {
          nombre: nuevoFutbolista.value.nombre,
          idequipo: nuevoFutbolista.value.idequipo,
          numero: nuevoFutbolista.value.numero,
          añosenequipo: nuevoFutbolista.value.añosEnEquipo,
          tipo: nuevoFutbolista.value.tipo
        };

        if (isEditing.value) {
          const futbolista = futbolistaStore.futbolistas[currentIndex.value];
          await futbolistaStore.actualizarFutbolista(futbolista.idfutbolista, payload);
          isEditing.value = false;
        } else {
          await futbolistaStore.agregarFutbolista(payload);
        }
        resetForm();
      } catch (err) {
        alert('Error al guardar futbolista: ' + err.message);
      }
    };

    const seleccionarFutbolista = (index) => {
      selectedFutbolista.value = index;
      const futbolista = futbolistaStore.futbolistas[selectedFutbolista.value];
      nuevoFutbolista.value = {
        nombre: futbolista.nombre,
        idequipo: futbolista.idequipo,
        numero: futbolista.numero,
        añosEnEquipo: futbolista.añosenequipo,
        tipo: futbolista.tipo
      };
      isEditing.value = true;
      currentIndex.value = selectedFutbolista.value;
    };

    const eliminarFutbolista = async () => {
      try {
        const futbolista = futbolistaStore.futbolistas[selectedFutbolista.value];
        await futbolistaStore.eliminarFutbolista(futbolista.idfutbolista);
        resetForm();
      } catch (err) {
        alert('Error al eliminar futbolista: ' + err.message);
      }
    };

    const cancelarEdicion = () => {
      resetForm();
    };

    const resetForm = () => {
      nuevoFutbolista.value = {
        nombre: '',
        idequipo: equipoStore.equipos[0]?.idequipo || '',
        numero: 0,
        añosEnEquipo: 0,
        tipo: 'Delantero'
      };
      isEditing.value = false;
      selectedFutbolista.value = null;
    };

    return {
      futbolistas: futbolistaStore.futbolistas,
      equipos: equipoStore.equipos,
      nuevoFutbolista,
      agregarFutbolista,
      eliminarFutbolista,
      seleccionarFutbolista,
      cancelarEdicion,
      tableHeaders: ['Nombre', 'Equipo', 'Número', 'Años en el Equipo', 'Posición / Rol'],
      formattedFutbolistas: computed(() =>
        futbolistaStore.futbolistas.map(futbolista => [
          futbolista.nombre,
          futbolista.equipo ? futbolista.equipo.nomequipo : 'Sin equipo',
          futbolista.numero,
          futbolista.añosenequipo,
          futbolista.tipo
        ])
      ),
      isEditing,
      selectedFutbolista
    };
  }
};
</script>

<style scoped>
.main-container {
  margin-top: 50px;
}
</style>
