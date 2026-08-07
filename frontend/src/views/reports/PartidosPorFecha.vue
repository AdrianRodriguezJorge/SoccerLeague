<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Partidos por Fecha</h1>
      <div class="row">
        <div class="col-md-12">
          <p>Seleccione una fecha y estadio y se mostrarán los partidos correspondientes:</p>
          <input type="date" class="form-control mb-3" v-model="fecha" />
          <Dropdown :items="estadios" v-model="estadio" id="estadio" />
          <Button text="Generar Reporte" type="success" @click="generarReporte" class="mt-3" />
          <div class="action-buttons mt-3">
            <Button text="Imprimir" :icon="'fas fa-print'" type="primary" @click="imprimirReporte" />
            <div class="send-email">
              <input
                type="email"
                class="form-control email-input"
                v-model="email"
                placeholder="Escribe tu correo aquí"
                required
              />
              <Button
                :icon="'fas fa-envelope'"
                text="Enviar por correo"
                type="primary"
                @click="enviarReporte"
                id="dd"
              />
            </div>
          </div>
          <Table :headers="tableHeaders" :rows="reporte" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Navbar from '../../common/Navbar.vue';
import Button from '../../common/Button.vue';
import Dropdown from '../../common/Dropdown.vue';
import Table from '../../common/Table.vue';
import apiClient from "@/apiClient";

export default {
  name: "PartidosPorFecha",
  components: { Navbar, Dropdown, Button, Table },
  setup() {
    const estadios = ref([]);
    const fecha = ref('');
    const estadio = ref('Todos');
    const reporte = ref([]);
    const email = ref('');

    const fetchEstadios = async () => {
      try {
        const response = await apiClient.get('/estadios');
        estadios.value = ['Todos', ...response.data.map(estadio => estadio.nombre)];
      } catch (error) {
        console.error('Error al obtener los estadios:', error);
      }
    };

    const fetchReporte = async (fecha, estadio) => {
      try {
        const url = estadio === 'Todos' ? `/reportes/partidos-por-fecha?fecha=${fecha}` : `/reportes/partidos-por-fecha?fecha=${fecha}&estadio=${estadio}`;
        console.log('API URL:', url); // Verificar la URL

        const response = await apiClient.get(url);
        console.log('Response:', response); // Verificar la respuesta

        if (response.data && response.data.length) {
          reporte.value = response.data.map(partido => ({
            fecha: partido.fecha,
            estadio: partido.estadio,
            local: partido.local,
            visitante: partido.visitante,
            resultado: partido.resultado
          }));
        } else {
          console.warn('No data received:', response);
          alert('No se encontraron datos para los parámetros seleccionados.');
        }
      } catch (error) {
        console.error('Error al obtener el reporte:', error);
        alert('Hubo un error al obtener el reporte. Por favor, intenta nuevamente más tarde.');
      }
    };

    const generarReporte = () => {
      if (!fecha.value) {
        console.warn('Fecha no seleccionada.'); // Verificar si la fecha está seleccionada
        alert('Por favor, seleccione una fecha.');
        return;
      }
      console.log('Fecha seleccionada:', fecha.value); // Verificar la fecha seleccionada
      console.log('Estadio seleccionado:', estadio.value); // Verificar el estadio seleccionado
      fetchReporte(fecha.value, estadio.value);
    };

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Reporte de Partidos por Fecha", 10, 10);
      doc.autoTable({
        head: [["Fecha", "Estadio", "Local", "Visitante", "Resultado"]],
        body: reporte.value.map(partido => [partido.fecha, partido.estadio, partido.local, partido.visitante, partido.resultado]),
      });
      doc.save("reporte_partidos_por_fecha.pdf");
    };

    const enviarReporte = async () => {
      const doc = new jsPDF();
      doc.text("Reporte de Partidos por Fecha", 10, 10);
      doc.autoTable({
        head: [["Fecha", "Estadio", "Local", "Visitante", "Resultado"]],
        body: reporte.value.map(partido => [partido.fecha, partido.estadio, partido.local, partido.visitante, partido.resultado]),
      });
      const pdf = doc.output('blob');
      const formData = new FormData();
      formData.append('file', pdf, 'reporte_partidos_por_fecha.pdf');
      formData.append('email', email.value);
      try {
        await apiClient.post('/reportes/enviar-pdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Reporte enviado por correo exitosamente');
      } catch (error) {
        console.error('Error enviando el reporte:', error);
        alert('Error enviando el reporte');
      }
    };

    onMounted(fetchEstadios);

    return {
      estadios,
      fecha,
      estadio,
      reporte,
      generarReporte,
      imprimirReporte,
      enviarReporte,
      email,
    };
  },
};
</script>

<style scoped>
.main-container {
  margin-top: 20px;
}

.mt-3 {
  margin-top: 1rem;
}

.action-buttons {
  display: flex;
  align-items: center;
}

.send-email {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.email-input {
  margin-right: 0.5rem;
  height: auto;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
}

button {
  width: auto;
}

#dd {
  white-space: nowrap;
}
</style>
