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
      </div>
      <Table :headers="tableHeaders" :rows="reporte" />
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useEquipoStore } from '../../stores/equipoStore';
import Navbar from '../../common/Navbar.vue';
import Button from '../../common/Button.vue';
import Table from '../../common/Table.vue';

export default {
  name: "ReporteTablaPosiciones",
  components: {
    Navbar,
    Button,
    Table,
  },
  setup() {
    const equipoStore = useEquipoStore();
    const reporte = equipoStore.equipos.map(equipo => ({
      equipo: equipo.nombre,
      partidosJugados: equipo.partidosJugados || 0,
      ganados: equipo.ganados || 0,
      empates: equipo.empates || 0,
      perdidos: equipo.perdidos || 0,
      puntos: equipo.puntos || 0
    }));

    const tableHeaders = [
      "Equipo",
      "Partidos Jugados",
      "Ganados",
      "Empates",
      "Perdidos",
      "Puntos",
    ];

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Tabla de posiciones de la liga", 10, 10);
      doc.autoTable({ html: ".report-table" });
      doc.save("tabla_posiciones_liga.pdf");
    };

    return {
      reporte,
      tableHeaders,
      imprimirReporte
    };
  },
};
</script>

<style scoped>
.action-buttons {
  margin-bottom: 1rem;
}
</style>
