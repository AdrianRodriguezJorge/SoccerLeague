<template>
    <div class="container main-container">
      <h1>Estadios con mayor audiencia</h1>
      <div class="action-buttons">
        <Button
          :icon="'fas fa-print'"
          text="Imprimir"
          type="primary"
          @click="imprimirReporte"
        />
        <Button
          :icon="'fas fa-home'"
          text="Página Principal"
          type=""
          @click="irPaginaPrincipal"
        />
      </div>
      <Table :headers="tableHeaders" :rows="reporte" />
    </div>
  </template>

  <script>
  import { jsPDF } from "jspdf";
  import "jspdf-autotable";
  import Button from '../../common/Button.vue';
  import Table from '../../common/Table.vue';

  export default {
    name: "EstadiosMayorAudiencia",
    components: {
      Button,
      Table,
    },
    data() {
      return {
        reporte: [
          { estadio: "Estadio 1", audiencia: 85 },
          { estadio: "Estadio 2", audiencia: 75 },
        ],
        tableHeaders: ["Estadio", "Porcentaje de audiencia (%)"],
      };
    },
    methods: {
      imprimirReporte() {
        const doc = new jsPDF();
        doc.text("Estadios con mayor audiencia", 10, 10);
        doc.autoTable({ html: ".report-table" });
        doc.save("estadios_mayor_audiencia.pdf");
      },
      irPaginaPrincipal() {
        window.location.href = "./principal.html";
      },
    },
  };
  </script>

  <style scoped>
  .action-buttons {
    margin-bottom: 1rem;
  }
  </style>
