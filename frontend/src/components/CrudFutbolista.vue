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
              <select class="form-control" id="equipo" v-model="nuevoFutbolista.equipo" required>
                <option v-for="equipo in equipos" :key="equipo.nombre" :value="equipo.nombre">{{ equipo.nombre }}</option>
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
              <label for="tipo">Tipo</label>
              <select class="form-control" id="tipo" v-model="nuevoFutbolista.tipo" required>
                <option value="Jugador">Jugador</option>
                <option value="Entrenador">Entrenador</option>
              </select>
            </div>
            <div v-if="nuevoFutbolista.tipo === 'Jugador'" id="jugador-fields">
              <div class="form-group mb-3">
                <label for="partidosJugados">Partidos Jugados</label>
                <input type="number" class="form-control" id="partidosJugados" v-model="nuevoFutbolista.partidosJugados" min="0" />
              </div>
              <div class="form-group mb-3">
                <label for="cantidadGoles">Cantidad de Goles</label>
                <input type="number" class="form-control" id="cantidadGoles" v-model="nuevoFutbolista.cantidadGoles" min="0" />
              </div>
              <div class="form-group mb-3">
                <label for="asistencias">Asistencias</label>
                <input type="number" class="form-control" id="asistencias" v-model="nuevoFutbolista.asistencias" min="0" />
              </div>
              <div class="form-group mb-3">
                <label for="promedioGoles">Promedio de Goles</label>
                <input type="text" class="form-control" id="promedioGoles" :value="calcularPromedioGoles()" disabled />
              </div>
              <div class="form-group mb-3">
                <label for="posicion">Posición</label>
                <select class="form-control" id="posicion" v-model="nuevoFutbolista.posicion">
                  <option value="Defensa">Defensa</option>
                  <option value="Delantero">Delantero</option>
                  <option value="Mediocampista">Mediocampista</option>
                  <option value="Portero">Portero</option>
                </select>
              </div>
              <div v-if="nuevoFutbolista.posicion === 'Defensa'" id="defensa-fields">
                <div class="form-group mb-3">
                  <label for="entradas">Entradas</label>
                  <input type="number" class="form-control" id="entradas" v-model="nuevoFutbolista.entradas" min="0" />
                </div>
                <div class="form-group mb-3">
                  <label for="bloqueos">Bloqueos</label>
                  <input type="number" class="form-control" id="bloqueos" v-model="nuevoFutbolista.bloqueos" min="0" />
                </div>
              </div>
              <div v-if="nuevoFutbolista.posicion === 'Delantero'" id="delantero-fields">
                <div class="form-group mb-3">
                  <label for="tirosAPuerta">Tiros a Puerta</label>
                  <input type="number" class="form-control" id="tirosAPuerta" v-model="nuevoFutbolista.tirosAPuerta" min="0" />
                </div>
              </div>
              <div v-if="nuevoFutbolista.posicion === 'Mediocampista'" id="mediocampista-fields">
                <div class="form-group mb-3">
                  <label for="pasesCompletados">Pases Completados</label>
                  <input type="number" class="form-control" id="pasesCompletados" v-model="nuevoFutbolista.pasesCompletados" min="0" />
                </div>
                <div class="form-group mb-3">
                  <label for="intercepciones">Intercepciones</label>
                  <input type="number" class="form-control" id="intercepciones" v-model="nuevoFutbolista.intercepciones" min="0" />
                </div>
              </div>
              <div v-if="nuevoFutbolista.posicion === 'Portero'" id="portero-fields">
                <div class="form-group mb-3">
                  <label for="paradas">Paradas</label>
                  <input type="number" class="form-control" id="paradas" v-model="nuevoFutbolista.paradas" min="0" />
                </div>
                <div class="form-group mb-3">
                  <label for="golesEncajados">Goles Encajados</label>
                  <input type="number" class="form-control" id="golesEncajados" v-model="nuevoFutbolista.golesEncajados" min="0" />
                </div>
              </div>
            </div>
            <div v-if="nuevoFutbolista.tipo === 'Entrenador'" id="entrenador-fields">
              <div class="form-group mb-3">
                <label for="experiencia">Años de Experiencia</label>
                <input type="number" class="form-control" id="experiencia" v-model="nuevoFutbolista.experiencia" min="0" />
              </div>
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
import { ref, computed } from 'vue';
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
      equipo: '',
      numero: 0,
      añosEnEquipo: 0,
      tipo: 'Jugador',
      partidosJugados: 0,
      cantidadGoles: 0,
      asistencias: 0,
      posicion: 'Defensa',
      entradas: 0,
      bloqueos: 0,
      tirosAPuerta: 0,
      pasesCompletados: 0,
      intercepciones: 0,
      paradas: 0,
      golesEncajados: 0,
      experiencia: 0,
    });
    const isEditing = ref(false);
    const selectedFutbolista = ref(null);
    const currentIndex = ref(null);

    const agregarFutbolista = () => {
      if (isEditing.value) {
        futbolistaStore.actualizarFutbolista(currentIndex.value, nuevoFutbolista.value);
        isEditing.value = false;
      } else {
        futbolistaStore.agregarFutbolista(nuevoFutbolista.value);
      }
      resetForm();
    };

    const seleccionarFutbolista = (index) => {
      selectedFutbolista.value = index;
      const futbolista = futbolistaStore.futbolistas[selectedFutbolista.value];
      nuevoFutbolista.value = { ...futbolista };
      isEditing.value = true;
      currentIndex.value = selectedFutbolista.value;
    };

    const eliminarFutbolista = () => {
      futbolistaStore.eliminarFutbolista(selectedFutbolista.value);
      resetForm();
    };

    const cancelarEdicion = () => {
      resetForm();
    };

    const resetForm = () => {
      nuevoFutbolista.value = {
        nombre: '',
        equipo: '',
        numero: 0,
        añosEnEquipo: 0,
        tipo: 'Jugador',
        partidosJugados: 0,
        cantidadGoles: 0,
        asistencias: 0,
        posicion: 'Defensa',
        entradas: 0,
        bloqueos: 0,
        tirosAPuerta: 0,
        pasesCompletados: 0,
        intercepciones: 0,
        paradas: 0,
        golesEncajados: 0,
        experiencia: 0,
      };
      isEditing.value = false;
      selectedFutbolista.value = null;
    };

    const calcularPromedioGoles = () => {
      return nuevoFutbolista.value.partidosJugados > 0
        ? (nuevoFutbolista.value.cantidadGoles / nuevoFutbolista.value.partidosJugados).toFixed(2)
        : '0.00';
    };

    return {
      futbolistas: futbolistaStore.futbolistas,
      equipos: equipoStore.equipos,
      nuevoFutbolista,
      agregarFutbolista,
      eliminarFutbolista,
      seleccionarFutbolista,
      cancelarEdicion,
      calcularPromedioGoles,
      tableHeaders: ['Nombre', 'Equipo', 'Número', 'Años en el Equipo', 'Tipo', 'Posición'],
      formattedFutbolistas: computed(() =>
        futbolistaStore.futbolistas.map(futbolista => [
          futbolista.nombre,
          futbolista.equipo,
          futbolista.numero,
          futbolista.añosEnEquipo,
          futbolista.tipo,
          futbolista.tipo === 'Jugador' ? futbolista.posicion : '-'
        ])
      ),
      isEditing,
      selectedFutbolista
    };
  }
};
</script>
