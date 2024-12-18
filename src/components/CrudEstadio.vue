<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Gestión de Estadios</h1>
      <div class="row">
        <div class="col-md-4">
          <ul class="list-group">
            <li
              v-for="(estadio, index) in estadios"
              :key="index"
              class="list-group-item"
            >
              {{ estadio.nombre }} - {{ estadio.capacidad }}
            </li>
          </ul>
        </div>
        <div class="col-md-8">
          <form @submit.prevent="agregarEstadio">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input type="text" class="form-control" id="nombre" v-model="nuevoEstadio.nombre">
            </div>
            <div class="form-group">
              <label for="capacidad">Capacidad</label>
              <input type="number" class="form-control" id="capacidad" v-model="nuevoEstadio.capacidad">
            </div>
            <button type="submit" class="btn btn-success">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useEstadioStore } from '../stores/estadioStore';
import Navbar from '../components/Navbar.vue';

export default {
  components: { Navbar },
  setup() {
    const estadioStore = useEstadioStore();
    const nuevoEstadio = { nombre: '', capacidad: '' };

    const agregarEstadio = () => {
      estadioStore.agregarEstadio(nuevoEstadio.nombre, nuevoEstadio.capacidad);
      nuevoEstadio.nombre = '';
      nuevoEstadio.capacidad = '';
    };

    return {
      estadios: estadioStore.estadios,
      nuevoEstadio,
      agregarEstadio
    };
  }
};
</script>

<style scoped>
.main-container {
  margin-top: 50px;
}
</style>