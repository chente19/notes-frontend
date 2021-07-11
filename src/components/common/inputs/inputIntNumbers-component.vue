<template>
  <v-container>
    <br />
    <v-text-field
      v-model="numberInputValue"
      v-bind="sendInput"
      :counter="10"
      :rules="numberIntRules"
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
      numberIntRules: [
        (v) => !!v || "Número requerido",
        (v) => /^[1-9]+[0-9]*$/.test(v) || "Formato: Solo números",
        (v) => (v && v.length > 0) || "Verifica que este correcto",
      ],
      numberInputValue: "1",
    };
  },
  props: {
    titleLabel: {
      type: String,
      default: "número entero",
    },
  },
  computed: {
    sendInput() {
      this.$emit("listenChildNumInt", this.numberInputValue);
    },
  },
};
</script>
