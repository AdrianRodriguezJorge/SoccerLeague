<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Estado de un Equipo</h1>
      <div class="row">
        <div class="col-md-12">
          <p>Seleccione el equipo para ver su estado:</p>
          <Dropdown :items="equipos" v-model="equipoSeleccionado" @itemSelected="updateSelectedItem" />
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
          <Table :headers="tableHeaders" :rows="tableRows" class="mt-3" />
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
  name: "EstadoEquipo",
  components: { Navbar, Dropdown, Button, Table },
  setup() {
    const equipos = ref([]);
    const tableRows = ref([
      { Resultado: "Ganados", Total: 0, "Como Local": 0, "Como Visitante": 0 },
      { Resultado: "Empatados", Total: 0, "Como Local": 0, "Como Visitante": 0 },
      { Resultado: "Perdidos", Total: 0, "Como Local": 0, "Como Visitante": 0 },
    ]);
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
        const response = await apiClient.get(`/reportes/estado-del-equipo?nombre=${equipoSeleccionado.value}`);
        const equipo = response.data;

        tableRows.value = [
          {
            Resultado: "Ganados",
            Total: equipo.totalGanados,
            "Como Local": equipo.localGanados,
            "Como Visitante": equipo.visitanteGanados,
          },
          {
            Resultado: "Empatados",
            Total: equipo.totalEmpatados,
            "Como Local": equipo.localEmpatados,
            "Como Visitante": equipo.visitanteEmpatados,
          },
          {
            Resultado: "Perdidos",
            Total: equipo.totalPerdidos,
            "Como Local": equipo.localPerdidos,
            "Como Visitante": equipo.visitantePerdidos,
          },
        ];
      } catch (error) {
        tableRows.value = [];
        console.error("Error fetching report:", error);
      }
    };

    const equipoSeleccionado = ref(null);
    const tableHeaders = ["Resultado", "Total", "Como Local", "Como Visitante"];

    const updateSelectedItem = (value) => {
      equipoSeleccionado.value = value;
    };

    const generarReporte = () => {
      if (!equipoSeleccionado.value) {
        alert("Seleccione un equipo.");
        return;
      }
      fetchReporte();
    };

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Reporte de Estado de un Equipo", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: tableRows.value.map((row) => Object.values(row)),
      });
      doc.save("reporte_estado_equipo.pdf");
    };

    const enviarReporte = async () => {
      const doc = new jsPDF();
      doc.text("Reporte de Estado de un Equipo", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: tableRows.value.map((row) => Object.values(row)),
      });
      const pdf = doc.output('blob');
      const formData = new FormData();
      formData.append('file', pdf, 'reporte_estado_equipo.pdf');
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
      equipoSeleccionado,
      tableHeaders,
      tableRows,
      updateSelectedItem,
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
