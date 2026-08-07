<template>
  <div class="container login-container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="login-form bg-white rounded shadow p-4">
          <h3 class="text-center mb-4">INICIAR SESIÓN</h3>
          <div class="form-group">
            <label for="username">Usuario</label>
            <input type="text" class="form-control" id="username" v-model="username" placeholder="Ingrese su usuario" required />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Ingrese su contraseña" required />
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-success btn-block" @click="login">Iniciar</button>
          </div>
          <div v-if="loginErrorMessage" class="alert alert-danger mt-3" role="alert">
            {{ loginErrorMessage }}
          </div>
          <div class="form-group mt-4 text-center">
            <button class="btn btn-link" @click="showChangePasswordModal = true">¿Olvidaste tu contraseña?</button>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="showChangePasswordModal" title="CAMBIAR CONTRASEÑA" centered>
      <div class="change-password-form text-center">
        <div class="form-group">
          <label for="oldPassword">Contraseña Anterior</label>
          <input type="password" class="form-control" id="oldPassword" v-model="oldPassword" placeholder="Ingrese su contraseña anterior" required />
        </div>
        <div class="form-group">
          <label for="newPassword">Contraseña Nueva</label>
          <input type="password" class="form-control" id="newPassword" v-model="newPassword" placeholder="Ingrese su nueva contraseña" required />
        </div>
        <div class="d-flex justify-content-center">
          <button class="btn btn-success btn-block" @click="changePassword">Cambiar Contraseña</button>
        </div>
        <div v-if="changePasswordSuccessMessage" class="alert alert-success mt-3" role="alert">
          {{ changePasswordSuccessMessage }}
        </div>
        <div v-if="changePasswordErrorMessage" class="alert alert-danger mt-3" role="alert">
          {{ changePasswordErrorMessage }}
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import { BModal } from 'bootstrap-vue-3';

export default {
  components: {
    BModal,
  },
  data() {
    return {
      username: '',
      password: '',
      oldPassword: '',
      newPassword: '',
      loginErrorMessage: '',
      changePasswordSuccessMessage: '',
      changePasswordErrorMessage: '',
      showChangePasswordModal: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          nombre: this.username,
          password: this.password,
        });
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('usuario', this.username); // Guardar el nombre de usuario en el localStorage
        localStorage.setItem('rol', response.data.rol); // Guardar el rol en el localStorage
        this.$router.push('/');
      } catch (error) {
        this.loginErrorMessage = 'Usuario o contraseña incorrectos';
      }
    },
    async changePassword() {
      try {
        const response = await axios.put(
          'http://localhost:3000/auth/change-password',
          {
            nombre: this.username,
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          }
        );
        this.changePasswordSuccessMessage = 'Contraseña cambiada exitosamente';
        this.changePasswordErrorMessage = '';
      } catch (error) {
        this.changePasswordErrorMessage = 'Error al cambiar la contraseña';
        this.changePasswordSuccessMessage = '';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  margin-top: 100px;
  width: 80%;
}

.login-form {
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}

.login-form h3 {
  color: #333;
}

.form-control {
  border-radius: 5px;
}

.btn-success {
  margin-top: 15px;
  background-color: #28a745;
  border-color: #28a745;
  width: 100%;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.alert {
  border-radius: 5px;
}

.change-password-form .form-control {
  margin-bottom: 15px;
}

.btn .btn-link {
  text-decoration: none;
}

.change-password-form h3 {
  color: #333;

}

.btn-link {
  cursor: pointer;
}
</style>
