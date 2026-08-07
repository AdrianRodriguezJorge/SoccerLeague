<template>
  <Navbar />
  <div class="todo">
    <h1 class="text-center">Gestor de Equipos</h1>
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-primary" @click="showAddTeamModal">Añadir Equipo</button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Provincia</th>
            <th>Campeonatos Participados</th>
            <th>Campeonatos Ganados</th>
            <th>Mascota</th>
            <th>Color</th>
            <th>Puntos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in filteredTeams" :key="team.idequipo">
            <td>{{ team.nomequipo }}</td>
            <td>{{ team.provincia }}</td>
            <td>{{ team.camparticip }}</td>
            <td>{{ team.campganados }}</td>
            <td>{{ team.mascota }}</td>
            <td>{{ team.color }}</td>
            <td>{{ team.puntos }}</td>
            <td>
              <button @click="editTeam(team)" class="btn btn-warning btn-sm">Editar</button>
              <button @click="confirmDeleteTeam(team)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para añadir equipo -->
    <div v-if="isAdding" class="modal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Añadir Equipo</h5>
            <button type="button" class="btn-close" @click="isAdding = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addTeam">
              <div class="mb-3">
                <label for="addName" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="addName" v-model="addForm.nomequipo">
              </div>
              <div class="mb-3">
                <label for="addProvince" class="form-label">Provincia</label>
                <input type="text" class="form-control" id="addProvince" v-model="addForm.provincia">
              </div>
              <div class="mb-3">
                <label for="addCampParticip" class="form-label">Campeonatos Participados</label>
                <input type="number" class="form-control" id="addCampParticip" v-model="addForm.camparticip">
              </div>
              <div class="mb-3">
                <label for="addCampWon" class="form-label">Campeonatos Ganados</label>
                <input type="number" class="form-control" id="addCampWon" v-model="addForm.campganados">
              </div>
              <div class="mb-3">
                <label for="addMascot" class="form-label">Mascota</label>
                <input type="text" class="form-control" id="addMascot" v-model="addForm.mascota">
              </div>
              <div class="mb-3">
                <label for="addColor" class="form-label">Color</label>
                <input type="text" class="form-control" id="addColor" v-model="addForm.color">
              </div>
              <div class="mb-3">
                <label for="addPoints" class="form-label">Puntos</label>
                <input type="number" class="form-control" id="addPoints" v-model="addForm.puntos">
              </div>
              <button type="submit" class="btn btn-primary">Añadir Equipo</button>
            </form>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para editar equipo -->
    <div v-if="isEditing" class="modal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Equipo</h5>
            <button type="button" class="btn-close" @click="isEditing = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateTeam">
              <div class="mb-3">
                <label for="editName" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="editName" v-model="editForm.nomequipo">
              </div>
              <div class="mb-3">
                <label for="editProvince" class="form-label">Provincia</label>
                <input type="text" class="form-control" id="editProvince" v-model="editForm.provincia">
              </div>
              <div class="mb-3">
                <label for="editCampParticip" class="form-label">Campeonatos Participados</label>
                <input type="number" class="form-control" id="editCampParticip" v-model="editForm.camparticip">
              </div>
              <div class="mb-3">
                <label for="editCampWon" class="form-label">Campeonatos Ganados</label>
                <input type="number" class="form-control" id="editCampWon" v-model="editForm.campganados">
              </div>
              <div class="mb-3">
                <label for="editMascot" class="form-label">Mascota</label>
                <input type="text" class="form-control" id="editMascot" v-model="editForm.mascota">
              </div>
              <div class="mb-3">
                <label for="editColor" class="form-label">Color</label>
                <input type="text" class="form-control" id="editColor" v-model="editForm.color">
              </div>
              <div class="mb-3">
                <label for="editPoints" class="form-label">Puntos</label>
                <input type="number" class="form-control" id="editPoints" v-model="editForm.puntos">
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
            <p>¿Estás seguro de que deseas eliminar este equipo?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="isConfirmingDelete = false">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteTeam">Eliminar</button>
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

const teams = ref([]);
const isEditing = ref(false);
const isAdding = ref(false);
const isConfirmingDelete = ref(false);
const editForm = ref({ idequipo: null, nomequipo: '', provincia: '', camparticip: 0, campganados: 0, mascota: '', color: '', puntos: 0 });
const addForm = ref({ nomequipo: '', provincia: '', camparticip: 0, campganados: 0, mascota: '', color: '', puntos: 0 });
const teamToDelete = ref(null);
const errorMessage = ref('');
const searchTerm = ref('');

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

const showAddTeamModal = () => {
  addForm.value = { nomequipo: '', provincia: '', camparticip: 0, campganados: 0, mascota: '', color: '', puntos: 0 };
  isAdding.value = true;
  errorMessage.value = '';
};

const addTeam = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Adding team...', addForm.value);
    await axios.post('http://localhost:3000/equipos', addForm.value, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isAdding.value = false;
    console.log('Team added successfully');
    fetchTeams();
  } catch (error) {
    if (error.response) {
      errorMessage.value = `${error.response.data.message}`;
    } else {
      console.error('Error al añadir el equipo:', error);
    }
  }
};

const editTeam = (team) => {
  editForm.value = { ...team };
  isEditing.value = true;
  console.log('Editing team:', editForm.value);
};

const updateTeam = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log(editForm.value.idequipo);
    await axios.put(`http://localhost:3000/equipos/${editForm.value.idequipo}`, editForm.value, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isEditing.value = false;
    fetchTeams();
  } catch (error) {
    console.error('Error al actualizar el equipo:', error);
  }
};

const confirmDeleteTeam = (team) => {
  teamToDelete.value = team;
  isConfirmingDelete.value = true;
  console.log('Confirm delete team:', teamToDelete.value);
};

const deleteTeam = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Deleting team...', teamToDelete.value);
    await axios.delete(`http://localhost:3000/equipos/${teamToDelete.value.idequipo}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isConfirmingDelete.value = false;
    console.log('Team deleted successfully');
    fetchTeams();
  } catch (error) {
    console.error('Error al eliminar el equipo:', error);
  }
};

const filteredTeams = computed(() => {
  if (!searchTerm.value) {
    return teams.value;
  }
  return teams.value.filter(team =>
    team.nomequipo.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

onMounted(() => {
  console.log('Component mounted, fetching teams...');
  fetchTeams();
});
</script>

<style>
.todo {
  margin: 5px;
}
</style>
