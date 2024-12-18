<template>
  <div class="container main-container">
    <h1>Partidos por Fecha</h1>
    <div class="row">
      <div class="col-md-12">
        <p>Seleccione una fecha y estadio y se mostrarán los partidos correspondientes:</p>
        <input type="date" class="form-control mb-3" v-model="fecha" />
        <Dropdown :items="estadios" v-model="estadio" id="estadio" />
        <Button text="Generar Reporte" type="success" @click="generarReporte" class="mt-3" />
        <Button text="Imprimir" :icon="'fas fa-print'" type="primary" @click="imprimirReporte" class="mt-3" />
        <Button text="Página Principal" :icon="'fas fa-home'" type="" @click="irPaginaPrincipal" class="mt-3" />
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
  name: "PartidosPorFecha",
  components: { Dropdown, Button, Table },
  data() {
    return {
      estadios: ['Todos', 'Estadio 1', 'Estadio 2'],
      fecha: '',
      estadio: 'Todos',
      reporte: [],
    };
  },
  methods: {
    generarReporte() {
      const reporte = [
        { fecha: '2024-01-01', estadio: 'Estadio 1', local: 'Equipo 1', visitante: 'Equipo 2', resultado: '2-1' },
        { fecha: '2024-01-01', estadio: 'Estadio 2', local: 'Equipo 3', visitante: 'Equipo 4', resultado: '1-1' },
      ];

      this.reporte = reporte.filter(partido => {
        return partido.fecha === this.fecha && (this.estadio === 'Todos' || partido.estadio === this.estadio);
      });
    },
    imprimirReporte() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.text("Reporte de Partidos por Fecha", 10, 10);
      doc.autoTable({ html: '.report-table' });
      doc.save("reporte_partidos_por_fecha.pdf");
    },
    irPaginaPrincipal() {
      window.location.href = './principal.html';
    },
  },
};
</script>

<style scoped>
.main-container {
  margin-top: 20px;
}
</style>
