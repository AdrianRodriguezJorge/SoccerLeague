<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Estadios con mayor audiencia</h1>
      <div class="action-buttons">
        <Button
          :icon="'fas fa-print'"
          text="Imprimir"
          type="primary"
          @click="imprimirReporte"
        />
      </div>
      <Table :headers="tableHeaders" :rows="reporte" />
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useEstadioStore } from '../../stores/estadioStore';
import Navbar from '../../common/Navbar.vue';
import Button from '../../common/Button.vue';
import Table from '../../common/Table.vue';

export default {
  name: "EstadiosMayorAudiencia",
  components: {
    Navbar,
    Button,
    Table,
  },
  setup() {
    const estadioStore = useEstadioStore();
    const reporte = estadioStore.estadios.map(estadio => ({
      estadio: estadio.nombre,
      audiencia: estadio.audiencia
    }));

    const tableHeaders = ["Estadio", "Porcentaje de audiencia (%)"];

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Estadios con mayor audiencia", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: reporte.map(estadio => [estadio.estadio, estadio.audiencia]),
      });
      doc.save("estadios_mayor_audiencia.pdf");
    };

    return {
      reporte,
      tableHeaders,
      imprimirReporte,
    };
  },
};
</script>

<style scoped>
.action-buttons {
  margin-bottom: 1rem;
}
</style>
