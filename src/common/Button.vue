<template>
    <button :class="buttonClass" @click="$emit('click')">
      <i v-if="icon" :class="icon"></i> {{ text }}
    </button>
  </template>
  
  <script>
  export default {
    name: "Button",
    props: {
      text: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        default: "primary",
      },
    },
    computed: {
      buttonClass() {
        return `btn btn-${this.type}`;
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    margin-right: 0.5rem;
  }
  </style>
  