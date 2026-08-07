<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Entrenadores con más experiencia</h1>
      <div class="action-buttons">
        <Button
          :icon="'fas fa-print'"
          text="Imprimir"
          type="primary"
          @click="imprimirReporte"
        />
      </div>
      <Table :headers="tableHeaders" :rows="reporte" />
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { computed, onMounted } from 'vue';
import { useFutbolistaStore } from '../../stores/futbolistaStore';
import Navbar from '../../common/Navbar.vue';
import Button from '../../common/Button.vue';
import Table from '../../common/Table.vue';

export default {
  name: "ReporteEntrenadores",
  components: {
    Navbar,
    Button,
    Table,
  },
  setup() {
    const futbolistaStore = useFutbolistaStore();

    onMounted(async () => {
      await futbolistaStore.cargarFutbolistas();
    });

    const reporte = computed(() => {
      const entrenadores = futbolistaStore.futbolistas
        .filter(futbolista => futbolista.tipo === 'Entrenador')
        .sort((a, b) => b.añosenequipo - a.añosenequipo);

      return entrenadores.map(entrenador => [
        entrenador.nombre,
        entrenador.numero,
        entrenador.añosenequipo,
        entrenador.equipo ? entrenador.equipo.nomequipo : 'Sin equipo',
        entrenador.equipo ? entrenador.equipo.campganados : 0
      ]);
    });

    const tableHeaders = [
      "Nombre",
      "Número",
      "Años de experiencia",
      "Equipo",
      "Campeonatos ganados",
    ];

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Entrenadores con más experiencia", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: reporte.value,
      });
      doc.save("entrenadores_mas_experiencia.pdf");
    };

    return {
      reporte,
      tableHeaders,
      imprimirReporte,
    };
  },
};
</script>

<style scoped>
.action-buttons {
  margin-bottom: 1rem;
}
.main-container {
  margin-top: 50px;
}
</style>
