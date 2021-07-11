<template>
  <v-container>
    <br />
    <v-text-field
      v-model="numberThreeDecimalsValue"
      v-bind="sendInput"
      :counter="10"
      :rules="numberDecimalThreeRules"
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
      numberDecimalThreeRules: [
        (v) => !!v || "Este campo es requerido",
        (v) =>
          /^[1-9]+[0-9]*\.[0-9]{2}[0-9]?$/.test(v) ||
          "Formato: Números  PUNTO  3 Números",
        (v) => (v && v.length > 0) || "Verifica que esté correcto",
      ],
      numberThreeDecimalsValue: "1.000",
    };
  },
  props: {
    titleLabel: {
      type: String,
      default: "número decimal(3)",
    },
  },
  computed: {
    sendInput() {
      this.$emit("listenChildThreeDecimalNumber", this.numberThreeDecimalsValue);
    },
  },
};
</script>
