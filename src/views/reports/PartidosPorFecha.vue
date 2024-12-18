<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Partidos por Fecha</h1>
      <div class="row">
        <div class="col-md-12">
          <p>Seleccione una fecha y estadio y se mostrarán los partidos correspondientes:</p>
          <input type="date" class="form-control mb-3" v-model="fecha" />
          <Dropdown :items="estadios" v-model="estadio" id="estadio" />
          <Button text="Generar Reporte" type="success" @click="generarReporte" class="mt-3" />
          <Button text="Imprimir" :icon="'fas fa-print'" type="primary" @click="imprimirReporte" class="mt-3" />
          <Table :data="reporte" />
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
    const estadios = ['Todos', ...estadioStore.estadios.map(estadio => estadio.nombre)];
    const fecha = ref('');
    const estadio = ref('Todos');
    const reporte = ref([]);

    const generarReporte = () => {
      reporte.value = partidoStore.partidos.filter(partido =>
        partido.fecha === fecha.value && (estadio.value === 'Todos' || partido.estadio === estadio.value)
      ).map(partido => ({
        fecha: partido.fecha,
        estadio: partido.estadio,
        local: partido.local,
        visitante: partido.visitante,
        resultado: partido.resultado
      }));
    };

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Reporte de Partidos por Fecha", 10, 10);
      doc.autoTable({
        head: [["Fecha", "Estadio", "Local", "Visitante", "Resultado"]],
        body: reporte.value.map(partido => [partido.fecha, partido.estadio, partido.local, partido.visitante, partido.resultado]),
      });
      doc.save("reporte_partidos_por_fecha.pdf");
    };

    return {
      estadios,
      fecha,
      estadio,
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
