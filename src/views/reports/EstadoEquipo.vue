
<template>
  <div class="container main-container">
    <h1>Estado de un Equipo</h1>
    <div class="row">
      <div class="col-md-12">
        <p>Seleccione el equipo para ver su estado:</p>
        <Dropdown :items="equipos" v-model="equipoSeleccionado" @itemSelected="updateSelectedItem" />
        <Button text="Generar Reporte" type="success" @click="generarReporte" class="mt-3" />
        <Button text="Imprimir" :icon="'fas fa-print'" type="primary" @click="imprimirReporte" class="mt-3" />
        <Button text="Página Principal" :icon="'fas fa-home'" type="" @click="irPaginaPrincipal" class="mt-3" />
        <Table :headers="tableHeaders" :rows="tableRows" class="mt-3" />
      </div>
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Button from '../../common/Button.vue';
import Dropdown from '../../common/Dropdown.vue';
import Table from '../../common/Table.vue';


export default {
  name: "EstadoEquipo",
  components: {
    Button,
    Dropdown,
    Table,
  },
  data() {
    return {
      equipos: ["Equipo 1", "Equipo 2"],
      equipoSeleccionado: null,
      tableHeaders: ["Resultado", "Total", "Como Local", "Como Visitante"],
      tableRows: [
        { Resultado: "Ganados", Total: 0, "Como Local": 0, "Como Visitante": 0 },
        { Resultado: "Empatados", Total: 0, "Como Local": 0, "Como Visitante": 0 },
        { Resultado: "Perdidos", Total: 0, "Como Local": 0, "Como Visitante": 0 },
      ],
    };
  },
  methods: {
    updateSelectedItem(value) {
      console.log(value)
      this.equipoSeleccionado = value;

    },
    generarReporte() {
      if (!this.equipoSeleccionado) {
        alert("Seleccione un equipo.");
        return;
      }

      // Simulated report data
      const reporte = {
        totalGanados: 10,
        localGanados: 6,
        visitanteGanados: 4,
        totalEmpatados: 5,
        localEmpatados: 3,
        visitanteEmpatados: 2,
        totalPerdidos: 3,
        localPerdidos: 1,
        visitantePerdidos: 2,
      };

      this.tableRows = [
        {
          Resultado: "Ganados",
          Total: reporte.totalGanados,
          "Como Local": reporte.localGanados,
          "Como Visitante": reporte.visitanteGanados,
        },
        {
          Resultado: "Empatados",
          Total: reporte.totalEmpatados,
          "Como Local": reporte.localEmpatados,
          "Como Visitante": reporte.visitanteEmpatados,
        },
        {
          Resultado: "Perdidos",
          Total: reporte.totalPerdidos,
          "Como Local": reporte.localPerdidos,
          "Como Visitante": reporte.visitantePerdidos,
        },
      ];
    },
    imprimirReporte() {
      const doc = new jsPDF();
      doc.text("Reporte de Estado de un Equipo", 10, 10);
      doc.autoTable({
        head: [this.tableHeaders],
        body: this.tableRows.map((row) => Object.values(row)),
      });
      doc.save("reporte_estado_equipo.pdf");
    },
    irPaginaPrincipal() {
      window.location.href = "./principal.html";
    },
  },
};
</script>

<style scoped>
.mt-3 {
  margin-top: 1rem;
}
</style>
