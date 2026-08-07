<template>
  <div>
    <select class="form-control" :id="id" v-model="selectedValue" @change="emitSelection">
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
    modelValue: {
      type: String,
      default: '',
    },
  },

  computed: {
selectedValue: {

  get() {
    return this.modelValue;

  },

  set(value) {

    this.$emit('update:modelValue', value);

  },

}

},

  data() {
    return {
      selectedValue: this.modelValue,
    };
  },
  watch: {
    modelValue(newValue) {
      this.selectedValue = newValue;
    }
  },
    selectedValue(newValue) {
      this.$emit('update:modelValue', newValue);
    },
  methods: {
    emitSelection() {
      this.$emit('update:modelValue', this.selectedValue);
    },
  },
};
</script>

<style scoped>
.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>