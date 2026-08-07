<template>
  <Navbar />
  <div class="todo">
    <h1 class="text-center">Gestor de Partidos</h1>
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-primary" @click="showAddMatchModal">Añadir Partido</button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Audiencia</th>
            <th>Estadio</th>
            <th>Equipo Local</th>
            <th>Goles Local</th>
            <th>Equipo Visitante</th>
            <th>Goles Visitante</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="match in filteredMatches" :key="match.idpartido">
            <td>{{ formatDate(match.fecha) }}</td>
            <td>{{ match.audiencia }}</td>
            <td>{{ match.estadio.nomestadio }}</td>
            <td>{{ match.equipoLocal.nomequipo }}</td>
            <td>{{ match.goles_local }}</td>
            <td>{{ match.equipoVisitante.nomequipo }}</td>
            <td>{{ match.goles_visitante }}</td>
            <td>
              <button @click="editMatch(match)" class="btn btn-warning btn-sm">Editar</button>
              <button @click="confirmDeleteMatch(match)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para añadir partido -->
    <div v-if="isAdding" class="modal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Añadir Partido</h5>
            <button type="button" class="btn-close" @click="isAdding = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addMatch">
              <div class="mb-3">
                <label for="addDate" class="form-label">Fecha</label>
                <input type="date" class="form-control" id="addDate" v-model="addForm.fecha">
              </div>
              <div class="mb-3">
                <label for="addAudience" class="form-label">Audiencia</label>
                <input type="number" class="form-control" id="addAudience" v-model="addForm.audiencia">
              </div>
              <div class="mb-3">
                <label for="addStadium" class="form-label">Estadio</label>
                <select class="form-control" id="addStadium" v-model="addForm.fkestadio">
                  <option v-for="stadium in stadiums" :key="stadium.idestadio" :value="stadium.idestadio">{{ stadium.nomestadio }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="addLocalTeam" class="form-label">Equipo Local</label>
                <select class="form-control" id="addLocalTeam" v-model="addForm.local">
                  <option v-for="team in teams" :key="team.idequipo" :value="team.idequipo">{{ team.nomequipo }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="addGoalsLocal" class="form-label">Goles Local</label>
                <input type="number" class="form-control" id="addGoalsLocal" v-model="addForm.goles_local">
              </div>
              <div class="mb-3">
                <label for="addVisitorTeam" class="form-label">Equipo Visitante</label>
                <select class="form-control" id="addVisitorTeam" :disabled="addForm.local === null" v-model="addForm.visitante">
                  <option v-for="team in teams" :key="team.idequipo" :value="team.idequipo" :disabled="team.idequipo === addForm.local">{{ team.nomequipo }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="addGoalsVisitor" class="form-label">Goles Visitante</label>
                <input type="number" class="form-control" id="addGoalsVisitor" v-model="addForm.goles_visitante">
              </div>
              <button type="submit" class="btn btn-primary">Añadir Partido</button>
            </form>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para editar partido -->
    <div v-if="isEditing" class="modal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Partido</h5>
            <button type="button" class="btn-close" @click="isEditing = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateMatch">
              <div class="mb-3">
                <label for="editDate" class="form-label">Fecha</label>
                <input type="date" class="form-control" id="editDate" v-model="editForm.fecha">
              </div>
              <div class="mb-3">
                <label for="editAudience" class="form-label">Audiencia</label>
                <input type="number" class="form-control" id="editAudience" v-model="editForm.audiencia">
              </div>
              <div class="mb-3">
                <label for="editStadium" class="form-label">Estadio</label>
                <select class="form-control" id="editStadium" v-model="editForm.fkestadio">
                  <option v-for="stadium in stadiums" :key="stadium.idestadio" :value="stadium.idestadio">{{ stadium.nomestadio }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="editLocalTeam" class="form-label">Equipo Local</label>
                <select class="form-control" id="editLocalTeam" v-model="editForm.local">
                  <option v-for="team in teams" :key="team.idequipo" :value="team.idequipo">{{ team.nomequipo }}</option>
                </select>
              </div>
              <div class="mb-3">
                                <label for="editVisitorTeam" class="form-label">Equipo Visitante</label>
                <select class="form-control" id="editVisitorTeam" :disabled="editForm.local === null" v-model="editForm.visitante">
                  <option v-for="team in teams" :key="team.idequipo" :value="team.idequipo" :disabled="team.idequipo === editForm.local">{{ team.nomequipo }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="editGoalsVisitor" class="form-label">Goles Visitante</label>
                <input type="number" class="form-control" id="editGoalsVisitor" v-model="editForm.goles_visitante">
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
            <p>¿Estás seguro de que deseas eliminar este partido?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="isConfirmingDelete = false">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteMatch">Eliminar</button>
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

const matches = ref([]);
const stadiums = ref([]);
const teams = ref([]);
const isEditing = ref(false);
const isAdding = ref(false);
const isConfirmingDelete = ref(false);
const editForm = ref({ idpartido: null, fecha: '', audiencia: 0, fkestadio: null, local: null, visitante: null, goles_local: 0, goles_visitante: 0 });
const addForm = ref({ fecha: '', audiencia: 0, fkestadio: null, local: null, visitante: null, goles_local: 0, goles_visitante: 0 });
const matchToDelete = ref(null);
const errorMessage = ref('');
const searchTerm = ref('');

const fetchMatches = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Fetching matches...');
    const response = await axios.get('http://localhost:3000/partidos', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    matches.value = response.data;
    console.log('Matches fetched:', matches.value);
  } catch (error) {
    console.error('Error al obtener los partidos:', error);
  }
};

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

const showAddMatchModal = () => {
  addForm.value = { fecha: '', audiencia: 0, fkestadio: null, local: null, visitante: null, goles_local: 0, goles_visitante: 0 };
  isAdding.value = true;
  errorMessage.value = '';
};

const addMatch = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Adding match...', addForm.value);
    await axios.post('http://localhost:3000/partidos', { ...addForm.value, fecha: new Date(addForm.value.fecha).toISOString() }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isAdding.value = false;
    console.log('Match added successfully');
    fetchMatches();
  } catch (error) {
    if (error.response) {
      errorMessage.value = `${error.response.data.message}`;
    } else {
      console.error('Error al añadir el partido:', error);
    }
  }
};

const editMatch = (match) => {
  editForm.value = { ...match, fecha: new Date(match.fecha).toISOString().substring(0, 10) };
  isEditing.value = true;
  console.log('Editing match:', editForm.value);
};

const updateMatch = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log(editForm.value.idpartido);
    await axios.put(`http://localhost:3000/partidos/${editForm.value.idpartido}`, { ...editForm.value, fecha: new Date(editForm.value.fecha).toISOString() }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isEditing.value = false;
    fetchMatches();
  } catch (error) {
    console.error('Error al actualizar el partido:', error);
  }
};

const confirmDeleteMatch = (match) => {
  matchToDelete.value = match;
  isConfirmingDelete.value = true;
  console.log('Confirm delete match:', matchToDelete.value);
};

const deleteMatch = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Deleting match...', matchToDelete.value);
    await axios.delete(`http://localhost:3000/partidos/${matchToDelete.value.idpartido}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isConfirmingDelete.value = false;
    console.log('Match deleted successfully');
    fetchMatches();
  } catch (error) {
    console.error('Error al eliminar el partido:', error);
  }
};

const filteredMatches = computed(() => {
  if (!searchTerm.value) {
    return matches.value;
  }
  return matches.value.filter(match =>
    match.estadio.nomestadio.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    match.equipoLocal.nomequipo.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    match.equipoVisitante.nomequipo.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

onMounted(() => {
  console.log('Component mounted, fetching matches...');
  fetchMatches();
  fetchStadiums();
  fetchTeams();
});
</script>

<style>
.todo {
  margin: 5px;
}
</style>
