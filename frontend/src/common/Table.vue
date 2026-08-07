<template>
  <table class="table table-bordered table-striped report-table mt-3">
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        @click="$emit('select', rowIndex)"
        :class="{ selected: rowIndex === selected }"
      >
        <td v-for="(value, valueIndex) in row" :key="valueIndex">{{ value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    selected: {
      type: Number,
      default: null
    }
  }
};
</script>

<style scoped>
.table th, .table td {
  text-align: center;
  vertical-align: middle;
}
.table tr.selected {
  background-color: #d3d3d3;
}
</style>
