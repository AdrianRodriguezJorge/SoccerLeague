<template>
  <div class="container main-container">
    <h1>Tabla de posiciones de la liga</h1>
    <Button :icon="'fas fa-print'" text="Imprimir" type="primary" @click="imprimirReporte" />
    <Button :icon="'fas fa-home'" text="Página Principal" type="" @click="irPaginaPrincipal" />
  </div>
  <Table :headers="tableHeaders" :rows="reporte" />
</template>

<script>
import Button from '../../common/Button.vue';
import Table from '../../common/Table.vue';

export default {
  name: "TablaDePosiciones",
  components: { Button, Table },
  data() {
    return {
      reporte: [
        { equipo: 'Equipo 1', puntos: 30 },
        { equipo: 'Equipo 2', puntos: 25 },
      ],
    };
  },
  methods: {
    imprimirReporte() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.text("Tabla de posiciones de la liga", 10, 10);
      doc.autoTable({ html: '.report-table' });
      doc.save("tabla_posiciones_liga.pdf");
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
