<template>
  <Navbar />
  <div class="todo">
    <h1 class="text-center">Gestor de Futbolistas</h1>
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-primary" @click="showAddPlayerModal">Añadir Futbolista</button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Número</th>
            <th>Años en el Equipo</th>
            <th>Tipo</th>
            <th>Equipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in filteredPlayers" :key="player.idfutbolista">
            <td>{{ player.nombre }}</td>
            <td>{{ player.numero }}</td>
            <td>{{ player.añosenequipo }}</td>
            <td>{{ player.tipo }}</td>
            <td>{{ player.equipo.nomequipo }}</td>
            <td>
                          <button @click="editPlayer(player)" class="btn btn-warning btn-sm">Editar</button>
            <button @click="confirmDeletePlayer(player)" class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>


  <!-- Modal para añadir futbolista -->
  <div v-if="isAdding" class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Añadir Futbolista</h5>
          <button type="button" class="btn-close" @click="isAdding = false"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addPlayer">
            <div class="mb-3">
              <label for="addName" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="addName" v-model="addForm.nombre">
            </div>
            <div class="mb-3">
              <label for="addNumber" class="form-label">Número</label>
              <input type="number" class="form-control" id="addNumber" v-model="addForm.numero">
            </div>
            <div class="mb-3">
              <label for="addYears" class="form-label">Años en el Equipo</label>
              <input type="number" class="form-control" id="addYears" v-model="addForm.añosenequipo">
            </div>
            <div class="mb-3">
              <label for="addType" class="form-label">Tipo</label>
              <input type="text" class="form-control" id="addType" v-model="addForm.tipo">
            </div>
            <div class="mb-3">
              <label for="addTeam" class="form-label">Equipo</label>
              <select class="form-control" id="addTeam" v-model="addForm.idequipo">
                <option v-for="team in teams" :key="team.idequipo" :value="team.idequipo">{{ team.nomequipo }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Añadir Futbolista</button>
          </form>
          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal para editar futbolista -->
  <div v-if="isEditing" class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Futbolista</h5>
          <button type="button" class="btn-close" @click="isEditing = false"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updatePlayer">
            <div class="mb-3">
              <label for="editName" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="editName" v-model="editForm.nombre">
            </div>
            <div class="mb-3">
              <label for="editNumber" class="form-label">Número</label>
              <input type="number" class="form-control" id="editNumber" v-model="editForm.numero">
            </div>
            <div class="mb-3">
              <label for="editYears" class="form-label">Años en el Equipo</label>
              <input type="number" class="form-control" id="editYears" v-model="editForm.añosenequipo">
            </div>
            <div class="mb-3">
              <label for="editType" class="form-label">Tipo</label>
              <input type="text" class="form-control" id="editType" v-model="editForm.tipo">
            </div>
            <div class="mb-3">
              <label for="editTeam" class="form-label">Equipo</label>
              <select class="form-control" id="editTeam" v-model="editForm.idequipo">
                <option v-for="team in teams" :key="team.idequipo" :value="team.idequipo">{{ team.nomequipo }}</option>
              </select>
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
          <p>¿Estás seguro de que deseas eliminar este futbolista?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="isConfirmingDelete = false">Cancelar</button>
          <button type="button" class="btn btn-danger" @click="deletePlayer">Eliminar</button>
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

const players = ref([]);
const teams = ref([]);
const isEditing = ref(false);
const isAdding = ref(false);
const isConfirmingDelete = ref(false);
const editForm = ref({ idfutbolista: null, nombre: '', numero: 0, añosenequipo: 0, tipo: '', idequipo: null });
const addForm = ref({ nombre: '', numero: 0, añosenequipo: 0, tipo: '', idequipo: null });
const playerToDelete = ref(null);
const errorMessage = ref('');
const searchTerm = ref('');

const fetchPlayers = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Fetching players...');
    const response = await axios.get('http://localhost:3000/futbolistas', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    players.value = response.data;
    console.log('Players fetched:', players.value);
  } catch (error) {
    console.error('Error al obtener los futbolistas:', error);
  }
};

const fetchTeams = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Fetching teams...');
    const response = await axios.get('http://localhost:3000/equipos', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    teams.value = response.data;
    console.log('Teams fetched:', teams.value);
  } catch (error) {
    console.error('Error al obtener los equipos:', error);
  }
};

const showAddPlayerModal = () => {
  addForm.value = { nombre: '', numero: 0, añosenequipo: 0, tipo: '', idequipo: null };
  isAdding.value = true;
  errorMessage.value = '';
};

const addPlayer = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Adding player...', addForm.value);
    await axios.post('http://localhost:3000/futbolistas', addForm.value, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isAdding.value = false;
    console.log('Player added successfully');
    fetchPlayers();
  } catch (error) {
    if (error.response) {
      errorMessage.value = `${error.response.data.message}`;
    } else {
      console.error('Error al añadir el futbolista:', error);
    }
  }
};

const editPlayer = (player) => {
  editForm.value = { ...player };
  isEditing.value = true;
  console.log('Editing player:', editForm.value);
};

const updatePlayer = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log(editForm.value.idfutbolista);
    await axios.put(`http://localhost:3000/futbolistas/${editForm.value.idfutbolista}`, editForm.value, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isEditing.value = false;
    fetchPlayers();
  } catch (error) {
    console.error('Error al actualizar el futbolista:', error);
  }
};

const confirmDeletePlayer = (player) => {
  playerToDelete.value = player;
  isConfirmingDelete.value = true;
  console.log('Confirm delete player:', playerToDelete.value);
};

const deletePlayer = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Deleting player...', playerToDelete.value);
    await axios.delete(`http://localhost:3000/futbolistas/${playerToDelete.value.idfutbolista}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isConfirmingDelete.value = false;
    console.log('Player deleted successfully');
    fetchPlayers();
  } catch (error) {
    console.error('Error al eliminar el futbolista:', error);
  }
};

const filteredPlayers = computed(() => {
  if (!searchTerm.value) {
    return players.value;
  }
  return players.value.filter(player =>
    player.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    player.equipo.nomequipo.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

onMounted(() => {
  console.log('Component mounted, fetching players...');
  fetchPlayers();
  fetchTeams();
});
</script>

<style>
.todo {
  margin: 5px;
}
</style>
