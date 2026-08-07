<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Tabla de posiciones de la liga</h1>
      <div class="action-buttons">
        <Button
          :icon="'fas fa-print'"
          text="Imprimir"
          type="primary"
          @click="imprimirReporte"
        />
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
</template>

<script>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { ref, onMounted } from "vue";
import Navbar from '../../common/Navbar.vue';
import Button from '../../common/Button.vue';
import Table from '../../common/Table.vue';
import apiClient from "@/apiClient";

export default {
  name: "ReporteTablaPosiciones",
  components: {
    Navbar,
    Button,
    Table,
  },
  setup() {
    const reporte = ref([]);
    const email = ref('');
    const tableHeaders = [
      "Equipo",
      "Partidos Jugados",
      "Ganados",
      "Empates",
      "Perdidos",
      "Puntos",
    ];

    const fetchReporte = async () => {
      try {
        const response = await apiClient.get('/reportes/posiciones');
        reporte.value = response.data.map(row => ({
          equipo: row.equipo,
          partidosJugados: row.partidosJugados,
          ganados: row.ganados,
          empatados: row.empatados,
          perdidos: row.perdidos,
          puntos: row.puntos
        }));
      } catch (error) {
        reporte.value = [];
        console.error("Error fetching report:", error);
      }
    };

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Tabla de posiciones de la liga", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: reporte.value.map(row => [
          row.equipo,
          row.partidosJugados,
          row.ganados,
          row.empatados,
          row.perdidos,
          row.puntos
        ]),
      });
      doc.save("tabla_posiciones_liga.pdf");
    };

    const enviarReporte = async () => {
      const doc = new jsPDF();
      doc.text("Tabla de posiciones de la liga", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: reporte.value.map(row => [
          row.equipo,
          row.partidosJugados,
          row.ganados,
          row.empatados,
          row.perdidos,
          row.puntos
        ]),
      });
      const pdf = doc.output('blob');
      const formData = new FormData();
      formData.append('file', pdf, 'tabla_posiciones_liga.pdf');
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

    onMounted(fetchReporte);

    return {
      reporte,
      tableHeaders,
      imprimirReporte,
      enviarReporte,
      email,
    };
  },
};
</script>

<style scoped>
.action-buttons {
  margin-bottom: 1rem;
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
