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
          <Button text="Imprimir" :icon="'fas fa-print'" type="primary" @click="imprimirReporte" class="mt-3" />
          <Table :headers="tableHeaders" :rows="tableRows" class="mt-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useEquipoStore } from '../../stores/equipoStore';
import Navbar from '../../common/Navbar.vue';
import Button from '../../common/Button.vue';
import Dropdown from '../../common/Dropdown.vue';
import Table from '../../common/Table.vue';

export default {
  name: "EstadoEquipo",
  components: {
    Navbar,
    Button,
    Dropdown,
    Table,
  },
  setup() {
    const equipoStore = useEquipoStore();
    const equipos = equipoStore.equipos.map(equipo => equipo.nombre);
    const equipoSeleccionado = ref(null);
    const tableHeaders = ["Resultado", "Total", "Como Local", "Como Visitante"];
    const tableRows = ref([
      { Resultado: "Ganados", Total: 0, "Como Local": 0, "Como Visitante": 0 },
      { Resultado: "Empatados", Total: 0, "Como Local": 0, "Como Visitante": 0 },
      { Resultado: "Perdidos", Total: 0, "Como Local": 0, "Como Visitante": 0 },
    ]);

    const updateSelectedItem = (value) => {
      equipoSeleccionado.value = value;
    };

    const generarReporte = () => {
      if (!equipoSeleccionado.value) {
        alert("Seleccione un equipo.");
        return;
      }

      const equipo = equipoStore.equipos.find(e => e.nombre === equipoSeleccionado.value);

      if (equipo) {
        const reporte = {
          totalGanados: equipo.ganados || 0,
          localGanados: equipo.localGanados || 0,
          visitanteGanados: equipo.visitanteGanados || 0,
          totalEmpatados: equipo.empatados || 0,
          localEmpatados: equipo.localEmpatados || 0,
          visitanteEmpatados: equipo.visitanteEmpatados || 0,
          totalPerdidos: equipo.perdidos || 0,
          localPerdidos: equipo.localPerdidos || 0,
          visitantePerdidos: equipo.visitantePerdidos || 0,
        };

        tableRows.value = [
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
      }
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

    return {
      equipos,
      equipoSeleccionado,
      tableHeaders,
      tableRows,
      updateSelectedItem,
      generarReporte,
      imprimirReporte,
    };
  },
};
</script>

<style scoped>
.mt-3 {
  margin-top: 1rem;
}
</style>
