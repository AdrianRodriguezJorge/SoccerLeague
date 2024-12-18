<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Partidos por Equipos</h1>
      <div class="row">
        <div class="col-md-12">
          <p>Seleccione dos Equipos:</p>
          <label for="equipo1">Equipo 1:</label>
          <Dropdown :items="equipos" v-model="equipo1" id="equipo1" />
          <label for="equipo2">Equipo 2:</label>
          <Dropdown :items="equipos" v-model="equipo2" id="equipo2" />
          <Button text="Generar Reporte" type="success" @click="generarReporte" class="mt-3" />
          <Button text="Imprimir" :icon="'fas fa-print'" type="primary" @click="imprimirReporte" class="mt-3" />
          <Table :headers="tableHeaders" :rows="reporte" class="mt-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { usePartidoStore } from '../../stores/partidoStore';
import { useEquipoStore } from '../../stores/equipoStore';
import Navbar from '../../common/Navbar.vue';
import Button from '../../common/Button.vue';
import Dropdown from '../../common/Dropdown.vue';
import Table from '../../common/Table.vue';

export default {
  name: "PartidosPorEquipo",
  components: { Navbar, Dropdown, Button, Table },
  setup() {
    const equipoStore = useEquipoStore();
    const partidoStore = usePartidoStore();
    const equipos = equipoStore.equipos.map(equipo => equipo.nombre);
    const equipo1 = ref(null);
    const equipo2 = ref(null);
    const tableHeaders = ["Fecha", "Local", "Visitante", "Resultado"];
    const reporte = ref([]);

    const generarReporte = () => {
      if (equipo1.value === equipo2.value) {
        alert("Debe seleccionar 2 equipos diferentes.");
        return;
      }

      reporte.value = partidoStore.partidos.filter(partido =>
        (partido.local === equipo1.value && partido.visitante === equipo2.value) ||
        (partido.local === equipo2.value && partido.visitante === equipo1.value)
      ).map(partido => ({
        fecha: partido.fecha,
        local: partido.local,
        visitante: partido.visitante,
        resultado: partido.resultado
      }));
    };

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Reporte de Partidos por Equipos", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: reporte.value.map(partido => Object.values(partido)),
      });
      doc.save("reporte_partidos_por_equipos.pdf");
    };

    return {
      equipos,
      equipo1,
      equipo2,
      tableHeaders,
      reporte,
      generarReporte,
      imprimirReporte,
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
</style>
