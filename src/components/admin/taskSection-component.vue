<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
          <v-toolbar flat color="light-green lighten-4">
            <v-icon color="blue" left>mdi-file-chart</v-icon>
            <v-toolbar-title>Listado de Notas</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="createNote">
              Agregar nota
            </v-btn>
          </v-toolbar>
          <br />
          <v-alert
            :value="showEmptyArray"
            color="blue-grey"
            dark
            border="left"
            icon="mdi-alert"
            transition="scroll-y-reverse-transition"
            >No hay ninguna nota creada</v-alert
          >
        </v-card>
        <br />
        <v-container>
          <v-card class="mx-auto" elevation="15">
            <v-card-text>
              <p class="text-h4 text--primary">
                Titulo
              </p>
              <div class="text--primary">
                Contenido.<br />
                mas contenido
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">
                Editar
              </v-btn>
              <v-btn text color="deep-purple accent-4">
                Borrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showEmptyArray: true,
      notesArray: [],
      notesArraySize: 5,
      responsable_user: "",
    };
  },
  created() {
    this.takeUserId();
    this.listRecords();
  },
  methods: {
    createNote() {
      this.notesArray.forEach((element, index) => {
        console.log(element);
      });
    },
    async checkList() {
      if (this.notesArray.length > 0) {
        this.showEmptyArray = false;
      } else {
        this.showEmptyArray = true;
      }
    },
    async listRecords() {
      try {
        let counter = 0;
        let response = await axios.get(`task/list/${this.responsable_user}`);
        this.notesArray = response.data;
        this.notesArray.forEach((item) => {
          counter += 1;
        });
        this.notesArraySize = counter;
        this.checkList();
      } catch (e) {
        console.error(e);
      }
    },
    takeUserId() {
      let resultGetter = this.$store.getters.currentUser;
      this.responsable_user = resultGetter.user_number;
    },
  },
};
</script>
