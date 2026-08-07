<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Partidos por Equipos</h1>
      <div class="row">
        <div class="col-md-12">
          <p>Seleccione dos Equipos:</p>
          <label for="equipo1">Equipo 1:</label>
          <Dropdown :items="equipos" v-model="equipo1" id="equipo1" />
          <label for="equipo2">Equipo 2:</label>
          <Dropdown :items="equipos" v-model="equipo2" id="equipo2" />
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
          <Table :headers="tableHeaders" :rows="reporte" class="mt-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { ref, onMounted } from "vue";
import Navbar from '../../common/Navbar.vue';
import Button from '../../common/Button.vue';
import Dropdown from '../../common/Dropdown.vue';
import Table from '../../common/Table.vue';
import apiClient from "@/apiClient";

export default {
  name: "PartidosPorEquipo",
  components: { Navbar, Dropdown, Button, Table },
  setup() {
    const equipos = ref([]);
    const reporte = ref([]);
    const email = ref('');

    const fetchTeams = async () => {
      try {
        const response = await apiClient.get('/equipos');
        equipos.value = response.data.map((equipo) => equipo.nomequipo);
        console.log('Teams fetched:', equipos.value);
      } catch (error) {
        console.error('Error al obtener los equipos:', error);
      }
    };

    const fetchReporte = async () => {
      try {
        const response = await apiClient.get(`/reportes/partidos-entre-equipos?equipo1=${equipo1.value}&equipo2=${equipo2.value}`);
        console.log(response.data);
        reporte.value = response.data.map((row) => ({
          fecha: row.fecha,
          local: row.local,
          visitante: row.visitante,
          resultado: row.resultado
        }));
      } catch (error) {
        reporte.value = [];
        console.error("Error fetching report:", error);
      }
    };

    const equipo1 = ref(null);
    const equipo2 = ref(null);
    const tableHeaders = ["Fecha", "Local", "Visitante", "Resultado"];

    const generarReporte = () => {
      if (equipo1.value === equipo2.value) {
        alert("Debe seleccionar 2 equipos diferentes.");
        return;
      }

      fetchReporte();
    };

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Reporte de Partidos por Equipos", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: reporte.value.map(partido => Object.values(partido)),
      });
      doc.save("reporte_partidos_por_equipos.pdf");
    };

    const enviarReporte = async () => {
      const doc = new jsPDF();
      doc.text("Reporte de Partidos por Equipos", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: reporte.value.map(partido => Object.values(partido)),
      });
      const pdf = doc.output('blob');
      const formData = new FormData();
      formData.append('file', pdf, 'reporte_partidos_por_equipos.pdf');
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

    onMounted(fetchTeams);

    return {
      equipos,
      equipo1,
      equipo2,
      tableHeaders,
      reporte,
      generarReporte,
      imprimirReporte,
      email,
      enviarReporte,
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
