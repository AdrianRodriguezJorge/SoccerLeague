<template>
    <div>
      <select class="form-control" :id="id" v-model="selectedValue">
        <option v-for="(item, index) in items" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: "Dropdown",
    props: {
      items: {
        type: Array,
        required: true,
      },
      id: {
        type: String,
        default: "dropdown",
      },
      value: {
        type: [String, Number],
        default: null,
      },
    },
    computed: {
      selectedValue: {
        get() {
          return this.value;
        },
        set(newValue) {
          this.$emit("input", newValue);
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .form-control {
    width: 100%;
  }
  </style>
  