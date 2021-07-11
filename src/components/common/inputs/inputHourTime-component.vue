<template>
  <v-container>
    <v-dialog
      ref="modalHourTime"
      v-model="showModalHourTime"
      :return-value.sync="hourTimeBinding"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <br />
        <v-text-field
          v-model="hourTimeBinding"
          v-bind:label="titleLabel"
          prepend-icon="mdi-clock-time-four-outline"
          :rules="[(v) => !!v || 'Este campo es requerido.']"
          readonly
          v-bind="attrs"
          v-on="on"
          outlined
          clearable
          required
        ></v-text-field>
      </template>
      <v-time-picker
        format="24hr"
        v-if="showModalHourTime"
        v-model="hourTimeBinding"
        full-width
      >
        <v-spacer></v-spacer>
        <v-btn text color="red" @click="showModalHourTime = false"
          >Cancelar</v-btn
        >
        <v-btn
          text
          color="green"
          @click="$refs.modalHourTime.save(hourTimeBinding)"
          v-bind="sendInput"
          >OK</v-btn
        >
      </v-time-picker>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      hourTimeBinding: "00:00",
      showModalHourTime: false,
    };
  },
  props: {
    titleLabel: {
      type: String,
      default: "Hora",
    },
  },
  computed: {
    sendInput() {
      this.$emit("listenChildHourTime", this.hourTimeBinding);
    },
  },
};
</script>
