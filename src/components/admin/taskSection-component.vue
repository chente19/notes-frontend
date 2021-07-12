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
          <br />
          <ul>
            <template v-for="notesArray in notesArrays">
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
                    <v-btn
                      text
                      color="deep-purple accent-4"
                      @click="updateNote(notesArray)"
                    >
                      Editar
                    </v-btn>
                    <v-btn
                      text
                      color="deep-purple accent-4"
                      @click="noteDelete(notesArray)"
                    >
                      Borrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-container>
              <br />
            </template>
          </ul>
          <!-- About Modal -->
          <template>
            <v-form>
              <v-row class="text-center">
                <v-dialog
                  v-model="correctForm"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <v-card>
                    <v-toolbar dark color="primary">
                      <v-toolbar-title>{{ modalTitle }}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn
                          v-show="showCancelButton"
                          dark
                          text
                          @click="correctForm = false"
                        >
                          <v-icon>mdi-close</v-icon>
                          <span>Cancelar</span>
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>
                    <br />
                    <v-col cols="12">
                      <v-img
                        :src="require('../../assets/check_list.png')"
                        class="my-3"
                        contain
                        height="200"
                      ></v-img>
                    </v-col>
                    <v-col cols="12">
                      <v-container>
                        <v-card class="mx-auto" elevation="15">
                          <v-card-text>
                            <p class="text-h4 text-center">
                              Título
                            </p>
                            <InputString
                              titleLabel="Escribe el titulo aqui"
                              @listenChildInputString="takeTitle"
                              @click:clear="checkInputs"
                            ></InputString>
                            <div class="text-h4 text-center">
                              Contenido
                            </div>
                            <InputString
                              titleLabel="Escribe el contenido aqui"
                              @listenChildInputString="takeContent"
                              @click:clear="checkInputs"
                            ></InputString>
                          </v-card-text>
                        </v-card>
                      </v-container>
                    </v-col>
                    <template>
                      <v-container>
                        <v-btn
                          v-show="showSaveButton"
                          block
                          elevation="15"
                          color="info"
                          dark
                          @click="createNewRecordRequest"
                          >PULSA PARA {{ modalTitle }}</v-btn
                        >
                      </v-container>
                    </template>
                    <br />

                    <template>
                      <v-container>
                        <v-alert
                          :value="showSuccessRequest"
                          color="success"
                          dark
                          dense
                          icon="mdi-check-circle"
                          transition="scroll-y-reverse-transition"
                          >El usuario No. {{ this.responsable_user }}, id al
                          {{ this.modalTitle }}:
                        </v-alert>
                        <br />
                        <v-alert
                          :value="showSuccessRequest"
                          color="purple"
                          dark
                          elevation="15"
                          prominent
                          outlined
                          border="bottom"
                          icon="mdi-eye-plus"
                          transition="scroll-y-reverse-transition"
                          >{{ newNumberRecordResponse }}</v-alert
                        >
                        <v-alert
                          :value="showErrorRequest"
                          color="error"
                          dark
                          border="top"
                          icon="mdi-alert-circle"
                          transition="scroll-y-reverse-transition"
                          >Error en la Operación</v-alert
                        >
                        <br />
                        <div class="d-flex justify-center">
                          <v-btn
                            v-show="showAcceptButton"
                            x-large
                            color="primary"
                            dark
                            @click="rebootComponent"
                            >ACEPTAR</v-btn
                          >
                        </div>
                      </v-container>
                    </template>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-form>
          </template>
          <!-- End of content Modal -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import InputString from "../common/inputs/inputString-component.vue";

export default {
  components: {
    InputString,
  },
  data() {
    return {
      showEmptyArray: false,
      notesArrays: [],
      notesArraySize: 0,
      responsable_user: "",
      currenTaskId: "",
      recordInterface: {
        title: "NA",
        content: "NA",
        responsable_user: "NA",
      },
      // vars about modal request
      correctForm: false,
      showCancelButton: true,
      showSaveButton: true,
      showSuccessRequest: false,
      newNumberRecordResponse: "",
      currentUser: "",
      showErrorRequest: false,
      showAcceptButton: false,
      showWarningForm: false,
      modalTitle: "",
      isCreateNote: false,
    };
  },
  created() {
    this.takeUserId();
    this.listRecords();
  },
  methods: {
    createNote() {
      this.isCreateNote = true;
      this.modalTitle = "CREAR NOTA";
      this.correctForm = true;
    },
    updateNote(aNote) {
      this.modalTitle = "Actualizar NOTA";
      this.isCreateNote = false;
      this.correctForm = true;
      this.recordInterface.responsable_user = this.responsable_user;
      this.currenTaskId = aNote.TASK_ID;
      this.takeTitle();
      this.takeContent();
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
    formValidation() {
      console.log("prueba");
    },
    rebootComponent() {
      this.showSuccessRequest = false;
      this.showCancelButton = true;
      this.showErrorRequest = false;
      this.showAcceptButton = true;
      this.showAcceptButton = false;
      this.showSaveButton = true;
      this.correctForm = false;
    },
    takeTitle(value) {
      this.recordInterface.title = value;
      this.checkInputs();
    },
    takeContent(value) {
      this.recordInterface.content = value;
      this.checkInputs();
    },
    checkInputs() {
      try {
        if (
          this.recordInterface.title.length < 1 ||
          this.recordInterface.title == null ||
          this.recordInterface.content.length < 1 ||
          this.recordInterface.content == null
        ) {
          this.showSaveButton = false;
        } else {
          this.showSaveButton = true;
        }
      } catch (e) {
        this.showSaveButton = false;
      }
    },
    createNewRecordRequest() {
      try {
        // take the responsable user
        this.recordInterface.responsable_user = this.responsable_user;
        // Petición axios
        if (this.isCreateNote) {
          this.requestCreateNote();
        } else {
          this.requestUpdateNote();
        }
      } catch (e) {}
    },
    async requestCreateNote() {
      try {
        const backResponse = await axios.post(
          "task/add/",
          this.recordInterface
        );
        const theData = await backResponse.data;
        const numberValueString = await theData.new_task_id;
        this.newNumberRecordResponse = numberValueString;
        this.showSuccessRequest = true;
        this.showAcceptButton = true;
        this.showCancelButton = false;
        this.showSaveButton = false;
        // push the new note
        this.notesArrays.push(this.recordInterface);
      } catch (e) {
        console.error(e);
        this.showSuccessRequest = false;
        this.showCancelButton = false;
        this.showErrorRequest = true;
        this.showAcceptButton = true;
      }
    },
    async requestUpdateNote() {
      try {
        const backResponse = await axios.put(
          `task/update/${this.currenTaskId}`,
          this.recordInterface
        );
        const theData = await backResponse.data;
        const numberValueString = await theData.TASK_ID;
        const theUpdatedTitle = await theData.title;
        const theUpdatedContent = await theData.content;
        this.newNumberRecordResponse = numberValueString;
        let index = this.notesArrays.findIndex(
          (obj) => obj.TASK_ID == numberValueString
        );
        this.notesArrays[index] = {
          TASK_ID: numberValueString,
          title: theUpdatedTitle,
          content: theUpdatedContent,
        };
        this.showSuccessRequest = true;
        this.showAcceptButton = true;
        this.showCancelButton = false;
        this.showSaveButton = false;
      } catch (e) {
        console.error(e);
        this.showSuccessRequest = false;
        this.showCancelButton = false;
        this.showErrorRequest = true;
        this.showAcceptButton = true;
      }
    },
    async noteDelete(theNote) {
      console.log("borrando nota --> " + theNote.TASK_ID);
      console.log(this.responsable_user);
      let deleteInterface = {
        responsable_user: this.responsable_user,
      };
      try {
        const backResponse = await axios.put(
          `task/deactivate/${theNote.TASK_ID}`,
          deleteInterface
        );
        let index = this.notesArrays.findIndex(
          (obj) => obj.TASK_ID == theNote.TASK_ID
        );
        this.notesArrays.splice(index, 1);
        alert(`La Nota con id ${theNote.TASK_ID} fue eliminada`);
        this.checkList();
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
