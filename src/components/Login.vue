<template>
  <div class="container login-container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="login-form bg-white rounded shadow p-4">
          <h3 class="text-center mb-4">INICIAR SESIÓN</h3>
          <div class="form-group">
            <label for="username">Usuario</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
              placeholder="Ingrese su usuario"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-success btn-block" @click="login">Iniciar</button>
          </div>
          <div class="d-flex justify-content-center mt-3">
            <button class="btn btn-link" @click="forgotPassword">Olvidó su contraseña?</button>
          </div>
          <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === 'admin') {
        this.$router.push('/principal');
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    },
    forgotPassword() {
      // Lógica para manejar el olvido de la contraseña
      alert('Redirigiendo a la página de recuperación de contraseña');
    }
  }
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

.btn-link {
  color: #007bff;
  text-decoration: none;
}

.btn-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

.alert {
  border-radius: 5px;
}
</style>
