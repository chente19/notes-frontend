<template>
  <v-container>
    <br />
    <v-text-field
      v-model="stringInputValue"
      v-bind="sendInput"
      :counter="100"
      :rules="[(v) => !!v || 'Este campo es requerido.']"
      v-bind:label="titleLabel"
      outlined
      clearable
      required
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      stringInputValue: "NA",
    };
  },
  props: {
    titleLabel: {
      type: String,
      default: "Cadena de Caracteres",
    },
  },
  computed: {
    sendInput() {
      this.$emit("listenChildInputString", this.stringInputValue);
    },
  },
};
</script>
