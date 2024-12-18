<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Entrenadores con más experiencia</h1>
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
import Navbar from '../../common/Navbar.vue';
import Button from '../../common/Button.vue';
import Table from '../../common/Table.vue';

export default {
  name: "ReporteEntrenadores",
  components: {
    Navbar,
    Button,
    Table,
  },
  data() {
    return {
      reporte: [
        { nombre: "Entrenador 1", numero: 1, experiencia: 20, equipo: "Equipo 1", campeonatos: 5 },
        { nombre: "Entrenador 2", numero: 2, experiencia: 15, equipo: "Equipo 2", campeonatos: 3 },
      ],
      tableHeaders: [
        "Nombre",
        "Número",
        "Años de experiencia",
        "Equipo",
        "Campeonatos ganados",
      ],
    };
  },
  methods: {
    imprimirReporte() {
      const doc = new jsPDF();
      doc.text("Entrenadores con más experiencia", 10, 10);
      doc.autoTable({ html: ".report-table" });
      doc.save("entrenadores_mas_experiencia.pdf");
    }
  },
};
</script>

<style scoped>
.action-buttons {
  margin-bottom: 1rem;
}
</style>
