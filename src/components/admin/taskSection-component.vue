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
          <ul>
            <template v-for="notesArray in notesArrays">
              <br />
              <v-container>
                <v-card class="mx-auto" elevation="15">
                  <v-card-text>
                    <p class="text-h4 text--primary">
                     {{ notesArray.title }}
                    </p>
                    <div class="text--primary">
                      {{ notesArray.content }}
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
            </template>
          </ul>
        </v-card>
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
      notesArrays: [],
      notesArraySize: 0,
      responsable_user: "",
      items: [
        { numero: 1 },
        { numero: 2 },
        { numero: 3 },
        { numero: 4 },
        { numero: 5 },
      ],
    };
  },
  created() {
    this.takeUserId();
    this.listRecords();
  },
  methods: {
    createNote() {
      this.notesArrays.forEach((element, index) => {
        console.log(element);
      });
    },
    async checkList() {
      if (this.notesArrays.length > 0) {
        this.showEmptyArray = false;
      } else {
        this.showEmptyArray = true;
      }
    },
    async listRecords() {
      try {
        let counter = 0;
        let response = await axios.get(`task/list/${this.responsable_user}`);
        this.notesArrays = response.data;
        this.notesArrays.forEach((item) => {
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
