<template>
  <Navbar />
  <div class="todo">
    <h1 class="text-center">Gestor de Estadios</h1>
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-primary" @click="showAddStadiumModal">Añadir Estadio</button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Capacidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stadium in filteredStadiums" :key="stadium.idestadio">
            <td>{{ stadium.nomestadio }}</td>
            <td>{{ stadium.capacidad }}</td>
            <td>
              <button @click="editStadium(stadium)" class="btn btn-warning btn-sm">Editar</button>
              <button @click="confirmDeleteStadium(stadium)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para añadir estadio -->
    <div v-if="isAdding" class="modal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Añadir Estadio</h5>
            <button type="button" class="btn-close" @click="isAdding = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addStadium">
              <div class="mb-3">
                <label for="addName" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="addName" v-model="addForm.nomestadio">
              </div>
              <div class="mb-3">
                <label for="addCapacity" class="form-label">Capacidad</label>
                <input type="number" class="form-control" id="addCapacity" v-model="addForm.capacidad">
              </div>
              <button type="submit" class="btn btn-primary">Añadir Estadio</button>
            </form>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para editar estadio -->
    <div v-if="isEditing" class="modal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Estadio</h5>
            <button type="button" class="btn-close" @click="isEditing = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateStadium">
              <div class="mb-3">
                <label for="editName" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="editName" v-model="editForm.nomestadio">
              </div>
              <div class="mb-3">
                <label for="editCapacity" class="form-label">Capacidad</label>
                <input type="number" class="form-control" id="editCapacity" v-model="editForm.capacidad">
              </div>
              <button type="submit" class="btn btn-primary">Guardar cambios</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para confirmar eliminación -->
    <div v-if="isConfirmingDelete" class="modal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Eliminación</h5>
            <button type="button" class="btn-close" @click="isConfirmingDelete = false"></button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro de que deseas eliminar este estadio?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="isConfirmingDelete = false">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteStadium">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Navbar from '../common/Navbar.vue';

const stadiums = ref([]);
const isEditing = ref(false);
const isAdding = ref(false);
const isConfirmingDelete = ref(false);
const editForm = ref({ idestadio: null, nomestadio: '', capacidad: '' });
const addForm = ref({ nomestadio: '', capacidad: '' });
const stadiumToDelete = ref(null);
const errorMessage = ref('');
const searchTerm = ref('');

const fetchStadiums = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Fetching stadiums...');
    const response = await axios.get('http://localhost:3000/estadios', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    stadiums.value = response.data;
    console.log('Stadiums fetched:', stadiums.value);
  } catch (error) {
    console.error('Error al obtener los estadios:', error);
  }
};

const showAddStadiumModal = () => {
  addForm.value = { nomestadio: '', capacidad: '' };
  isAdding.value = true;
  errorMessage.value = '';
};

const addStadium = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Adding stadium...', addForm.value);
    await axios.post('http://localhost:3000/estadios', addForm.value, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isAdding.value = false;
    console.log('Stadium added successfully');
    fetchStadiums();
  } catch (error) {
    if (error.response) {
      errorMessage.value = `${error.response.data.message}`;
    } else {
      console.error('Error al añadir el estadio:', error);
    }
  }
};

const editStadium = (stadium) => {
  editForm.value = { ...stadium };
  isEditing.value = true;
  console.log('Editing stadium:', editForm.value);
};

const updateStadium = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log(editForm.value.idestadio);
    await axios.put(`http://localhost:3000/estadios/${editForm.value.idestadio}`, editForm.value, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isEditing.value = false;
    fetchStadiums();
  } catch (error) {
    console.error('Error al actualizar el estadio:', error);
  }
};

const confirmDeleteStadium = (stadium) => {
  stadiumToDelete.value = stadium;
  isConfirmingDelete.value = true;
  console.log('Confirm delete stadium:', stadiumToDelete.value);
};

const deleteStadium = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Deleting stadium...', stadiumToDelete.value);
    await axios.delete(`http://localhost:3000/estadios/${stadiumToDelete.value.idestadio}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isConfirmingDelete.value = false;
    console.log('Stadium deleted successfully');
    fetchStadiums();
  } catch (error) {
    console.error('Error al eliminar el estadio:', error);
  }
};

const filteredStadiums = computed(() => {
  if (!searchTerm.value) {
    return stadiums.value;
  }
  return stadiums.value.filter(stadium =>
    stadium.nomestadio.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

onMounted(() => {
  console.log('Component mounted, fetching stadiums...');
  fetchStadiums();
});
</script>
