<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Partidos por Fecha</h1>
      <div class="row">
        <div class="col-md-12">
          <p>Seleccione una fecha y estadio y se mostrarán los partidos correspondientes:</p>
          <div class="form-group mb-3">
            <label for="fecha">Fecha:</label>
            <input type="date" class="form-control" id="fecha" v-model="fecha" />
          </div>
          <div class="form-group mb-3">
            <label for="estadio">Estadio:</label>
            <Dropdown :items="estadiosList" v-model="estadio" id="estadio" />
          </div>
          <Button text="Generar Reporte" type="success" @click="generarReporte" class="me-2 mt-2" />
          <Button text="Imprimir" :icon="'fas fa-print'" type="primary" @click="imprimirReporte" class="mt-2" />
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
import { useEstadioStore } from '../../stores/estadioStore';
import Navbar from '../../common/Navbar.vue';
import Button from '../../common/Button.vue';
import Dropdown from '../../common/Dropdown.vue';
import Table from '../../common/Table.vue';

export default {
  name: "PartidosPorFecha",
  components: { Navbar, Dropdown, Button, Table },
  setup() {
    const partidoStore = usePartidoStore();
    const estadioStore = useEstadioStore();
    
    const fecha = ref('');
    const estadio = ref('Todos');
    const reporte = ref([]);
    const tableHeaders = ["Fecha", "Estadio", "Local", "Visitante", "Resultado"];

    onMounted(async () => {
      await partidoStore.cargarPartidos();
      await estadioStore.cargarEstadios();
      
      // Inicializar con la fecha de hoy en formato YYYY-MM-DD
      fecha.value = new Date().toISOString().slice(0, 10);
    });

    const estadiosList = computed(() => {
      return ['Todos', ...estadioStore.estadios.map(estadio => estadio.nomestadio)];
    });

    const generarReporte = () => {
      if (!fecha.value) {
        alert("Por favor, seleccione una fecha.");
        return;
      }

      reporte.value = partidoStore.partidos.filter(partido => {
        const partidoDate = partido.fecha ? partido.fecha.slice(0, 10) : '';
        const matchFecha = partidoDate === fecha.value;
        
        let matchEstadio = true;
        if (estadio.value !== 'Todos') {
          matchEstadio = partido.estadio && partido.estadio.nomestadio === estadio.value;
        }
        
        return matchFecha && matchEstadio;
      }).map(partido => {
        const localName = partido.equipoLocal ? partido.equipoLocal.nomequipo : 'Desconocido';
        const visitanteName = partido.equipoVisitante ? partido.equipoVisitante.nomequipo : 'Desconocido';
        const estadioName = partido.estadio ? partido.estadio.nomestadio : 'Desconocido';
        return {
          fecha: new Date(partido.fecha).toLocaleDateString(),
          estadio: estadioName,
          local: localName,
          visitante: visitanteName,
          resultado: `${partido.goles_local} - ${partido.goles_visitante}`
        };
      });
    };

    const formattedRows = computed(() => {
      return reporte.value.map(partido => [
        partido.fecha,
        partido.estadio,
        partido.local,
        partido.visitante,
        partido.resultado
      ]);
    });

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Reporte de Partidos por Fecha", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: formattedRows.value,
      });
      doc.save("reporte_partidos_por_fecha.pdf");
    };

    return {
      estadiosList,
      fecha,
      estadio,
      reporte,
      tableHeaders,
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
