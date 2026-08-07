<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h1>Estado de un Equipo</h1>
      <div class="row">
        <div class="col-md-12">
          <p>Seleccione el equipo para ver su estado:</p>
          <div class="form-group mb-3" style="max-width: 400px;">
            <Dropdown :items="equiposList" v-model="equipoSeleccionado" @itemSelected="updateSelectedItem" />
          </div>
          <Button text="Generar Reporte" type="success" @click="generarReporte" class="me-2 mt-2" />
          <Button text="Imprimir" :icon="'fas fa-print'" type="primary" @click="imprimirReporte" class="mt-2" />
          <Table :headers="tableHeaders" :rows="tableRows" class="mt-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useEquipoStore } from '../../stores/equipoStore';
import { usePartidoStore } from '../../stores/partidoStore';
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
    const partidoStore = usePartidoStore();

    const equipoSeleccionado = ref(null);
    const tableHeaders = ["Resultado", "Total", "Como Local", "Como Visitante"];
    const tableRows = ref([
      ["Ganados", 0, 0, 0],
      ["Empatados", 0, 0, 0],
      ["Perdidos", 0, 0, 0],
    ]);

    onMounted(async () => {
      await equipoStore.cargarEquipos();
      await partidoStore.cargarPartidos();
      if (equipoStore.equipos.length > 0) {
        equipoSeleccionado.value = equipoStore.equipos[0].nomequipo;
        generarReporte();
      }
    });

    const equiposList = computed(() => {
      return equipoStore.equipos.map(equipo => equipo.nomequipo);
    });

    const updateSelectedItem = (value) => {
      equipoSeleccionado.value = value;
    };

    const generarReporte = () => {
      if (!equipoSeleccionado.value) {
        alert("Seleccione un equipo.");
        return;
      }

      const equipo = equipoStore.equipos.find(e => e.nomequipo === equipoSeleccionado.value);

      if (equipo) {
        let localGanados = 0;
        let localEmpatados = 0;
        let localPerdidos = 0;
        let visitanteGanados = 0;
        let visitanteEmpatados = 0;
        let visitantePerdidos = 0;

        partidoStore.partidos.forEach(partido => {
          if (partido.local === equipo.idequipo) {
            if (partido.goles_local > partido.goles_visitante) {
              localGanados++;
            } else if (partido.goles_local === partido.goles_visitante) {
              localEmpatados++;
            } else {
              localPerdidos++;
            }
          } else if (partido.visitante === equipo.idequipo) {
            if (partido.goles_visitante > partido.goles_local) {
              visitanteGanados++;
            } else if (partido.goles_visitante === partido.goles_local) {
              visitanteEmpatados++;
            } else {
              visitantePerdidos++;
            }
          }
        });

        tableRows.value = [
          [
            "Ganados",
            localGanados + visitanteGanados,
            localGanados,
            visitanteGanados,
          ],
          [
            "Empatados",
            localEmpatados + visitanteEmpatados,
            localEmpatados,
            visitanteEmpatados,
          ],
          [
            "Perdidos",
            localPerdidos + visitantePerdidos,
            localPerdidos,
            visitantePerdidos,
          ],
        ];
      }
    };

    const imprimirReporte = () => {
      const doc = new jsPDF();
      doc.text("Reporte de Estado de un Equipo: " + (equipoSeleccionado.value || ""), 10, 10);
      doc.autoTable({
        head: [tableHeaders],
        body: tableRows.value,
      });
      doc.save("reporte_estado_equipo.pdf");
    };

    return {
      equiposList,
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
.main-container {
  margin-top: 20px;
}
</style>
