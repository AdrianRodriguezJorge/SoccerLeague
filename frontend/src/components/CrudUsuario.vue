<template>
  <Navbar />
  <div class="todo">
    <h1 class="text-center">Gestor de Usuarios</h1>
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-primary" @click="showAddUserModal">Añadir Usuario</button>
      <div class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Buscar" v-model="searchTerm">
        <button class="btn btn-outline-primary" @click="searchUsers">Buscar</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <!-- <th>ID</th> -->
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <!-- <td>{{ user.id }}</td> -->
            <td>{{ user.nombre }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.rol }}</td>
            <td>
              <button @click="editUser(user)" class="btn btn-warning btn-sm">Editar</button>
              <button @click="confirmDeleteUser(user)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para añadir usuario -->
    <div v-if="isAdding" class="modal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Añadir Usuario</h5>
            <button type="button" class="btn-close" @click="isAdding = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addUser">
              <div class="mb-3">
                <label for="addName" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="addName" v-model="addForm.nombre">
              </div>
              <div class="mb-3">
                <label for="addEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="addEmail" v-model="addForm.email">
              </div>
              <div class="mb-3">
                <label for="addPassword" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="addPassword" v-model="addForm.password">
              </div>
              <div class="mb-3">
                <label for="addRole" class="form-label">Rol</label>
                <input type="text" class="form-control" id="addRole" v-model="addForm.rol">
              </div>
              <button type="submit" class="btn btn-primary">Añadir Usuario</button>
            </form>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para editar usuario -->
    <div v-if="isEditing" class="modal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Usuario</h5>
            <button type="button" class="btn-close" @click="isEditing = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUser">
              <div class="mb-3">
                <label for="editName" class="form-label">Nombre completo</label>
                <input type="text" class="form-control" id="editName" v-model="editForm.nombre">
              </div>
              <div class="mb-3">
                <label for="editEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="editEmail" v-model="editForm.email">
              </div>
              <div class="mb-3">
                <label for="editRole" class="form-label">Rol</label>
                <input type="text" class="form-control" id="editRole" v-model="editForm.rol">
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
            <p>¿Estás seguro de que deseas eliminar este usuario?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="isConfirmingDelete = false">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteUser">Eliminar</button>
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

const users = ref([]);
const isEditing = ref(false);
const isAdding = ref(false);
const isConfirmingDelete = ref(false);
const editForm = ref({ id: null, nombre: '', email: '', rol: '' });
const addForm = ref({ nombre: '', email: '', password: '', rol: '' });
const userToDelete = ref(null);
const errorMessage = ref('');
const searchTerm = ref('');

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Fetching users...');
    const response = await axios.get('http://localhost:3000/usuarios', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    users.value = response.data;
    console.log('Users fetched:', users.value);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
};

const showAddUserModal = () => {
  addForm.value = { nombre: '', email: '', password: '', rol: '' };
  isAdding.value = true;
  errorMessage.value = '';
};

const addUser = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Adding user...', addForm.value);
    await axios.post('http://localhost:3000/usuarios', addForm.value, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isAdding.value = false;
    console.log('User added successfully');
    fetchUsers();
  } catch (error) {
    if (error.response) {
      errorMessage.value = `${error.response.data.message}`;
    } else {
      console.error('Error al añadir el usuario:', error);
    }
  }
};

const editUser = (user) => {
  editForm.value = { ...user };
  isEditing.value = true;
  console.log('Editing user:', editForm.value);
};

const updateUser = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Updating user...', editForm.value);
    await axios.put(`http://localhost:3000/usuarios/${editForm.value.id}`, editForm.value, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isEditing.value = false;
    console.log('User updated successfully');
    fetchUsers();
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};

const confirmDeleteUser = (user) => {
  userToDelete.value = user;
  isConfirmingDelete.value = true;
  console.log('Confirm delete user:', userToDelete.value);
};

const deleteUser = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Deleting user...', userToDelete.value);
    await axios.delete(`http://localhost:3000/usuarios/${userToDelete.value.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    isConfirmingDelete.value = false;
    console.log('User deleted successfully');
    fetchUsers();
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
  }
};

const searchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Searching users...', searchTerm.value);
    const response = await axios.get('http://localhost:3000/usuarios/buscar', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        nombre: searchTerm.value
      }
    });
    users.value = response.data;
    console.log('Users found:', users.value);
  } catch (error) {
    console.error('Error al buscar los usuarios:', error);
  }
};

const filteredUsers = computed(() => {
  if (!searchTerm.value) {
    return users.value;
  }
  return users.value.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    user.rol.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

onMounted(() => {
  console.log('Component mounted, fetching users...');
  fetchUsers();
});
</script>

<style>
  .todo {
    margin: 5px;
  }
</style>
