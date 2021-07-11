<template>
  <v-container>
    <v-dialog
      ref="modalDate"
      v-model="showModalDate"
      :return-value.sync="dateBinding"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <br />
        <v-text-field
          v-model="dateBinding"
          v-bind:label="titleLabel"
          hint="AAAA-MM-DD"
          prepend-icon="mdi-calendar"
          :rules="[(v) => !!v || 'Este campo es requerido.']"
          readonly
          v-bind="attrs"
          v-on="on"
          outlined
          clearable
          required
        ></v-text-field>
      </template>
      <v-date-picker v-model="dateBinding">
        <v-spacer></v-spacer>
        <v-btn text color="red" @click="showModalDate = false">Cancelar</v-btn>
        <v-btn
          text
          color="green"
          @click="$refs.modalDate.save(dateBinding)"
          v-bind="sendInput"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dateBinding: new Date().toISOString().substr(0, 10),
      showModalDate: false,
    };
  },
  props: {
    titleLabel: {
      type: String,
      default: "Fecha",
    },
  },
  computed: {
    sendInput() {
      this.$emit("listenChildDate", this.dateBinding);
    },
  },
};
</script>
