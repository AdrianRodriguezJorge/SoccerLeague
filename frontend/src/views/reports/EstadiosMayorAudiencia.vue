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
import { computed, onMounted } from 'vue';
import { useEstadioStore } from '../../stores/estadioStore';
import { usePartidoStore } from '../../stores/partidoStore';
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
    const partidoStore = usePartidoStore();

    onMounted(async () => {
      await estadioStore.cargarEstadios();
      await partidoStore.cargarPartidos();
    });

    const reporte = computed(() => {
      return estadioStore.estadios.map(estadio => {
        const partidosDeEstadio = partidoStore.partidos.filter(p => p.fkestadio === estadio.idestadio);
        const sumAudiencia = partidosDeEstadio.reduce((sum, p) => sum + p.audiencia, 0);
        const countPartidos = partidosDeEstadio.length;
        const avgAudiencia = countPartidos > 0 ? (sumAudiencia / countPartidos) : 0;
        const pct = estadio.capacidad > 0 ? ((avgAudiencia / estadio.capacidad) * 100).toFixed(2) : '0.00';
        
        return [
          estadio.nomestadio,
          `${pct}% (${Math.round(avgAudiencia)} espectadores de promedio)`
        ];
      }).sort((a, b) => {
        const pctA = parseFloat(a[1]);
        const pctB = parseFloat(b[1]);
        return pctB - pctA;
      });
    });

    const tableHeaders = ["Estadio", "Porcentaje de audiencia de la capacidad (%)"];

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Estadios con mayor audiencia", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: reporte.value,
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
.main-container {
  margin-top: 50px;
}
</style>
