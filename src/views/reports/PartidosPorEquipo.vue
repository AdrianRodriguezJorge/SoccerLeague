<template>
    <div class="container main-container">
      <h1>Partidos por Equipos</h1>
      <div class="row">
        <div class="col-md-12">
          <p>Seleccione dos Equipos:</p>
          <Dropdown
            :items="equipos"
            v-model="equipo1"
            id="equipo1"
          />
          <Dropdown
            :items="equipos"
            v-model="equipo2"
            id="equipo2"
          />
          <Button
            btnClass="btn-success mt-3"
            :onClick="generarReporte"
          >
            Generar Reporte
          </Button>
          <Button
            btnClass="btn-primary mt-3"
            :onClick="imprimirReporte"
          >
            <i class="fas fa-print"></i> Imprimir
          </Button>
          <Button
            btnClass="btn- btn-right mt-3"
            :onClick="irPaginaPrincipal"
          >
            <i class="fas fa-home"></i> Página Principal
          </Button>
          <Table :data="reporte" />
        </div>
      </div>
    </div>
  </template>

  <script>
  import Button from '../../common/Button.vue';
  import Dropdown from '../../common/Dropdown.vue';
  import Table from '../../common/Table.vue';

  export default {
    name: "PartidosPorEquipo",
    components: { Dropdown, Button, Table },
    data() {
      return {
        equipos: ["Equipo 1", "Equipo 2"],
        equipo1: null,
        equipo2: null,
        reporte: [],
      };
    },
    methods: {
      generarReporte() {
        if (this.equipo1 === this.equipo2) {
          alert("Debe seleccionar 2 equipos diferentes.");
          return;
        }

        this.reporte = [
          { fecha: "2024-01-01", local: this.equipo1, visitante: this.equipo2, resultado: "2-1" },
          { fecha: "2024-02-01", local: this.equipo2, visitante: this.equipo1, resultado: "1-1" },
        ];
      },
      imprimirReporte() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Reporte de Partidos por Equipos", 10, 10);
        doc.autoTable({ html: ".report-table" });
        doc.save("reporte_partidos_por_equipos.pdf");
      },
      irPaginaPrincipal() {
        window.location.href = "./principal.html";
      },
    },
  };
  </script>

  <style scoped>
  .main-container {
    margin-top: 20px;
  }
  </style>
