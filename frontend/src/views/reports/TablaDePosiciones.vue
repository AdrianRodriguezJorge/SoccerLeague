<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Tabla de posiciones de la liga</h1>
      <div class="action-buttons">
        <Button
          :icon="'fas fa-print'"
          text="Imprimir"
          type="primary"
          @click="imprimirReporte"
        />
      </div>
      <Table :headers="tableHeaders" :rows="formattedRows" />
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { computed, onMounted } from 'vue';
import { useEquipoStore } from '../../stores/equipoStore';
import { usePartidoStore } from '../../stores/partidoStore';
import Navbar from '../../common/Navbar.vue';
import Button from '../../common/Button.vue';
import Table from '../../common/Table.vue';

export default {
  name: "ReporteTablaPosiciones",
  components: {
    Navbar,
    Button,
    Table,
  },
  setup() {
    const equipoStore = useEquipoStore();
    const partidoStore = usePartidoStore();

    onMounted(async () => {
      await equipoStore.cargarEquipos();
      await partidoStore.cargarPartidos();
    });

    const reporte = computed(() => {
      return equipoStore.equipos.map(equipo => {
        let partidosJugados = 0;
        let ganados = 0;
        let empates = 0;
        let perdidos = 0;

        partidoStore.partidos.forEach(partido => {
          if (partido.local === equipo.idequipo) {
            partidosJugados++;
            if (partido.goles_local > partido.goles_visitante) {
              ganados++;
            } else if (partido.goles_local === partido.goles_visitante) {
              empates++;
            } else {
              perdidos++;
            }
          } else if (partido.visitante === equipo.idequipo) {
            partidosJugados++;
            if (partido.goles_visitante > partido.goles_local) {
              ganados++;
            } else if (partido.goles_visitante === partido.goles_local) {
              empates++;
            } else {
              perdidos++;
            }
          }
        });

        const puntos = (ganados * 3) + empates;

        return {
          equipo: equipo.nomequipo,
          partidosJugados,
          ganados,
          empates,
          perdidos,
          puntos
        };
      }).sort((a, b) => b.puntos - a.puntos);
    });

    const tableHeaders = [
      "Equipo",
      "Partidos Jugados",
      "Ganados",
      "Empates",
      "Perdidos",
      "Puntos",
    ];

    const formattedRows = computed(() => {
      return reporte.value.map(row => [
        row.equipo,
        row.partidosJugados,
        row.ganados,
        row.empates,
        row.perdidos,
        row.puntos
      ]);
    });

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Tabla de posiciones de la liga", 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: formattedRows.value,
      });
      doc.save("tabla_posiciones_liga.pdf");
    };

    return {
      reporte,
      tableHeaders,
      formattedRows,
      imprimirReporte
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
