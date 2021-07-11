<template>
  <v-container>
    <v-select
      v-model="selectedOption"
      :items="optionHint"
      :rules="[(v) => !!v || 'Este campo es requerido.']"
      v-bind="sendInput"
      v-bind:label="titleLabel"
      dense
      required
    ></v-select>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: "si",
      optionHint: ["si", "no"],
    };
  },
  props: {
    titleLabel: {
      type: String,
      default: "Opción?",
    },
  },
  computed: {
    sendInput() {
      this.$emit("listenChildSelectOption", this.selectedOption);
    },
  },
};
</script>
