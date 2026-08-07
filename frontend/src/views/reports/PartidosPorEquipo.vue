<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Partidos por Equipos</h1>
      <div class="row">
        <div class="col-md-12">
          <p>Seleccione dos Equipos:</p>
          <div class="form-group mb-2">
            <label for="equipo1">Equipo 1:</label>
            <Dropdown :items="equiposList" v-model="equipo1" id="equipo1" />
          </div>
          <div class="form-group mb-3">
            <label for="equipo2">Equipo 2:</label>
            <Dropdown :items="equiposList" v-model="equipo2" id="equipo2" />
          </div>
          <Button text="Generar Reporte" type="success" @click="generarReporte" class="me-2" />
          <Button text="Imprimir" :icon="'fas fa-print'" type="primary" @click="imprimirReporte" />
          <Table :headers="tableHeaders" :rows="formattedRows" class="mt-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
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
    
    const equipo1 = ref(null);
    const equipo2 = ref(null);
    const tableHeaders = ["Fecha", "Local", "Visitante", "Resultado"];
    const reporte = ref([]);

    onMounted(async () => {
      await equipoStore.cargarEquipos();
      await partidoStore.cargarPartidos();
      if (equipoStore.equipos.length > 0) {
        equipo1.value = equipoStore.equipos[0].nomequipo;
        equipo2.value = equipoStore.equipos[1]?.nomequipo || equipoStore.equipos[0].nomequipo;
      }
    });

    const equiposList = computed(() => {
      return equipoStore.equipos.map(equipo => equipo.nomequipo);
    });

    const generarReporte = () => {
      if (!equipo1.value || !equipo2.value) {
        alert("Por favor, seleccione ambos equipos.");
        return;
      }
      if (equipo1.value === equipo2.value) {
        alert("Debe seleccionar 2 equipos diferentes.");
        return;
      }

      const e1 = equipoStore.equipos.find(e => e.nomequipo === equipo1.value);
      const e2 = equipoStore.equipos.find(e => e.nomequipo === equipo2.value);

      if (!e1 || !e2) return;

      const partidosFiltrados = partidoStore.partidos.filter(partido =>
        (partido.local === e1.idequipo && partido.visitante === e2.idequipo) ||
        (partido.local === e2.idequipo && partido.visitante === e1.idequipo)
      );

      reporte.value = partidosFiltrados.map(partido => {
        const localName = partido.equipoLocal ? partido.equipoLocal.nomequipo : 'Desconocido';
        const visitanteName = partido.equipoVisitante ? partido.equipoVisitante.nomequipo : 'Desconocido';
        return {
          fecha: new Date(partido.fecha).toLocaleDateString(),
          local: localName,
          visitante: visitanteName,
          resultado: `${partido.goles_local} - ${partido.goles_visitante}`
        };
      });
    };

    const formattedRows = computed(() => {
      return reporte.value.map(item => [
        item.fecha,
        item.local,
        item.visitante,
        item.resultado
      ]);
    });

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Reporte de Partidos por Equipos", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: formattedRows.value,
      });
      doc.save("reporte_partidos_por_equipos.pdf");
    };

    return {
      equiposList,
      equipo1,
      equipo2,
      tableHeaders,
      reporte,
      formattedRows,
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
.form-group {
  max-width: 400px;
}
</style>
