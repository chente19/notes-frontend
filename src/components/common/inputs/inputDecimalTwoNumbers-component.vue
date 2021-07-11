<template>
  <v-container>
    <br />
    <v-text-field
      v-model="numberTwoDecimalsValue"
      v-bind="sendInput"
      :counter="10"
      :rules="numberDecimalTwoRules"
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
      numberDecimalTwoRules: [
        (v) => !!v || "Este campo es requerido",
        (v) =>
          /^[1-9]+[0-9]*\.[0-9]{1}[0-9]?$/.test(v) ||
          "Formato: Números  PUNTO  2 Números",
        (v) => (v && v.length > 0) || "Verifica que esté correcto",
      ],
      numberTwoDecimalsValue: "1.00",
    };
  },
  props: {
    titleLabel: {
      type: String,
      default: "número decimal(2)",
    },
  },
  computed: {
    sendInput() {
      this.$emit("listenChildTwoDecimalNumber", this.numberTwoDecimalsValue);
    },
  },
};
</script>
