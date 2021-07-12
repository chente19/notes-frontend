<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
          <v-toolbar flat color="light-green lighten-4">
            <v-icon color="blue" left>mdi-account-convert</v-icon>
            <v-toolbar-title>Editar Usuario</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="white--text" elevation="4" color="error" @click="cancelUpdateUser">
              Cancelar
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form
              id="UpdateTheUser"
              ref="form"
              v-model="isValid"
              method="post"
              :lazy-validation="lazy"
              autocomplete="off"
            >
              <!-- Mostrando el número de usuario a editar -->
              <br />
              <br />
              <v-alert
                color="purple"
                dark
                elevation="15"
                prominent
                outlined
                border="bottom"
                icon="mdi-badge-account-horizontal"
                transition="scroll-y-reverse-transition"
                >Número:{{ currentUserToEditJson.user_number }}, Rol:
                {{ currentUserToEditJson.user_role }}</v-alert
              >
              <!-- selector de tipo de rol -->
              <br />
              <v-select
                v-model="role"
                :items="typeRole"
                :rules="[(v) => !!v || 'Este valor es requerido.']"
                label="Rol"
                dense
                required
              ></v-select>
              <br />
              <!-- imput de nombre de usuario -->
              <v-text-field
                v-model="userName"
                :counter="45"
                :rules="nameRules"
                label="Nombre(s)"
                required
              ></v-text-field>
              <!-- Primer apellido input -->
              <v-text-field
                v-model="lastName1"
                :counter="45"
                :rules="nameRules"
                label="Primer Apellido"
                required
              ></v-text-field>
              <!-- segundo apellido input -->
              <v-text-field
                v-model="lastName2"
                :counter="45"
                :rules="nameRules"
                label="Segundo Apellido"
                required
              ></v-text-field>
              <br />
              <!-- Está activo el usuario -->
              <v-switch
                v-model="userIsActive"
                inset
                label="¿Está activo?"
              ></v-switch>
              <br />
              <!-- email switch option -->
              <v-switch
                v-model="needEmail"
                inset
                label="Tiene correo electronico ?"
              ></v-switch>
              <!-- email input -->
              <v-text-field
                v-if="needEmail"
                v-model="userEmail"
                :rules="emailRules"
                label="Correo Electronico"
              ></v-text-field>
              <br />
              <hr id="gap-warning" />
              <!-- instrucciones de password -->
              <v-card-text>
                <div class="font-weight-bold ml-8 mb-2">
                  INSTRUCCIONES PARA CREAR CONTRASEÑA
                </div>
                <v-timeline align-top dense>
                  <v-timeline-item
                    v-for="instruction in passwordInstructions"
                    :key="instruction.legend"
                    :color="instruction.color"
                    small
                  >
                    <div>
                      <div class="font-weight-normal">
                        <div>{{ instruction.instruction }}</div>
                      </div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
              <!-- Password input -->
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                id="password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-icon="mdi-lock"
                :type="showPass ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña generada por el nuevo usuario"
                @click:append="showPass = !showPass"
                required
              ></v-text-field>
              <br />
              <!-- Verificacion de password -->
              <v-text-field
                v-model="samePassword"
                :rules="passwordRules"
                id="password"
                prepend-icon="mdi-lock"
                :type="showPass ? 'text' : 'password'"
                name="input-10-1"
                label="Verifica de nuevo tu contraseña"
                required
              ></v-text-field>
              <!-- Alert icon verificación de password -->
              <v-icon
                x-large
                center
                v-bind:color="verifyPasswordColor"
                v-bind="checkSamePassword"
                >{{ verifyPasswordIcon }}</v-icon
              >
              <span v-bind:class="verifyPasswordColorText">{{
                verifyPasswordText
              }}</span>
              <hr id="gap-warning" />
              <br />
              <!-- Dialogo Modal de guardar usuario -->
              <template>
                <v-row justify="center">
                  <v-dialog
                    v-model="correctForm"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    <template v-slot:activator="{ correctForm, attrs }">
                      <v-btn
                        block
                        elevation="15"
                        outlined
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="correctForm"
                        @click="formValidation"
                        >VALIDAR DATOS CAPTURADOS</v-btn
                      >
                    </template>
                    <v-card>
                      <v-toolbar dark color="primary">
                        <v-toolbar-title>DATOS CORRECTOS</v-toolbar-title>
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
                          :src="require('../../../../assets/check_list.png')"
                          class="my-3"
                          contain
                          height="200"
                        ></v-img>
                      </v-col>
                      <template>
                        <v-container>
                          <v-btn
                            v-show="showSaveButton"
                            block
                            elevation="15"
                            color="info"
                            dark
                            @click="updateTheUser"
                            >ACTUALIZAR USUARIO</v-btn
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
                            >Usuario {{ userName }} actualizado, No. de empleado
                            ...</v-alert
                          >
                          <br />
                          <v-alert
                            :value="showSuccessRequest"
                            color="purple"
                            dark
                            elevation="15"
                            prominent
                            outlined
                            border="bottom"
                            icon="mdi-badge-account-horizontal"
                            transition="scroll-y-reverse-transition"
                            >{{ currentUserToEditJson.user_number }}</v-alert
                          >
                          <v-alert
                            :value="showErrorRequest"
                            color="error"
                            dark
                            border="top"
                            icon="mdi-alert-circle"
                            transition="scroll-y-reverse-transition"
                            >Error al guardar el usuario</v-alert
                          >
                          <br />
                          <div class="d-flex justify-center">
                            <v-btn
                              v-show="showAcceptButton"
                              x-large
                              color="primary"
                              dark
                              @click="cancelUpdateUser"
                              >ACEPTAR</v-btn
                            >
                          </div>
                        </v-container>
                      </template>
                    </v-card>
                  </v-dialog>
                </v-row>
              </template>
              <br />
              <v-alert
                :value="showWarningForm"
                color="orange darken-4"
                dark
                border="top"
                icon="mdi-alert"
                transition="scroll-y-reverse-transition"
                >Cuidado!! Tienes algún error en los captura de datos</v-alert
              >
              <br />
              <v-btn class="white--text" elevation="4" color="error" @click="cancelUpdateUser">
                Cancelar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
#gap-warning {
  height: 1rem;
  border-width: 0;
  color: #fff176;
  background-color: #fff176;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentUserToEditJson: null,
      headers: [{ text: "Rol", value: "role", sortable: true }],
      userInterfaceNoEmail: {
        user_name: "",
        user_first_lastname: "",
        user_second_lastname: "",
        user_password: "",
        user_role: "",
        user_created_by: "",
      },
      userInterface: {
        user_name: "",
        user_first_lastname: "",
        user_second_lastname: "",
        user_password: "",
        user_role: "",
        user_modified_by: "",
        user_status: "",
        user_email: "",
      },
      isValid: true,
      lazy: false,
      currentUser: "",
      correctForm: false,
      showWarningForm: false,
      role: "",
      typeRole: ["admin"],
      userName: "",
      lastName1: "",
      lastName2: "",
      nameRules: [
        (v) => !!v || "El llenado de este campo es requerido",
        (v) => (v && v.length <= 45) || "No debe ser mayor a 45 caracteres.",
      ],
      userIsActive: true,
      needEmail: false,
      userEmail: "",
      emailRules: [
        (v) => !!v || "Correo electronico requerido",
        (v) => /.+@.+\..+/.test(v) || "Inserta correo electronico valido.",
      ],
      passwordInstructions: [
        {
          instruction: "Requiere ser creada por el nuevo usuario",
          color: "orange lighten-1",
        },
        {
          instruction: "La contraseña requiere ser mayor a 6 caracteres",
          color: "deep-purple lighten-1",
        },
        {
          instruction: "La contraseña inicia con cualquier palabra",
          color: "deep-purple lighten-1",
        },
        {
          instruction: "Seguido de un caracter espacial",
          color: "deep-purple lighten-1",
        },
        {
          instruction: "Ejemplo de caracter espacial: !@#$%^&*()_-+=",
          color: "deep-purple lighten-1",
        },
        {
          instruction: "Seguido de cualquier palabra",
          color: "deep-purple lighten-1",
        },
        {
          instruction: "Ejemplo de contraseña valida: palabra@otra",
          color: "deep-purple lighten-1",
        },
      ],
      password: "",
      showPass: false,
      passwordRules: [
        (v) => !!v || "Contraseña requerida.",
        (v) => (v && v.length >= 6) || "requiere ser mayor a 6 caracteres",
        (v) =>
          /.+[!@#\$%\^\&*\)\(+=._-].+/.test(v) ||
          "Verifica las Reglas de password.",
        (v) => (v && v.length <= 20) || "requiere ser menor a 20 caracteres",
      ],
      samePassword: "",
      verifyPasswordText: "La contraseña debe ser igual para ambos campos",
      verifyPasswordIcon: "mdi-alert",
      verifyPasswordColor: "red",
      verifyPasswordColorText: "red--text font-weight-bold",
      // data del modal dialogo
      theNewUpdateUser: "",
      showErrorRequest: false,
      showSuccessRequest: false,
      showCancelButton: true,
      showAcceptButton: false,
      showSaveButton: true,
    };
  },
  created() {
    this.getLocaltoEditUser();
    this.cleanVars();
  },
  computed: {
    checkSamePassword() {
      if (
        this.password == this.samePassword &&
        this.password != "" &&
        this.samePassword != ""
      ) {
        this.verifyPasswordIcon = "mdi-check-circle";
        this.verifyPasswordColor = "green";
        this.verifyPasswordText = "Correcto, ambas contraseñas son iguales";
        this.verifyPasswordColorText = "green--text font-weight-bold";
      } else {
        this.verifyPasswordIcon = "mdi-alert";
        this.verifyPasswordColor = "red";
        this.verifyPasswordText =
          "La contraseña debe ser igual para ambos campos";
        this.verifyPasswordColorText = "red--text font-weight-bold";
      }
    },
  },
  methods: {
    getLocaltoEditUser() {
      try {
        let localString = localStorage.getItem("ltoEditUser");
        this.currentUserToEditJson = JSON.parse(localString);
      } catch (error) {
        console.log("Nothing in local storage about ...");
      }
    },
    rebootComponent() {
      Object.assign(this.$data, this.$options.data());
    },
    cleanVars() {
      this.userName = this.currentUserToEditJson.user_name;
      this.userEmail = this.currentUserToEditJson.user_email;
      this.lastName1 = this.currentUserToEditJson.user_first_lastname;
      this.lastName2 = this.currentUserToEditJson.user_second_lastname;
      this.password = "";
      this.samePassword = "";
      this.role = this.currentUserToEditJson.user_role;
      this.theNewUpdateUser = this.currentUserToEditJson.user_number;
      this.userIsActive = this.currentUserToEditJson.user_status;
      this.needEmail = false;
      this.correctForm = false;
      this.showWarningForm = false;
      this.showErrorRequest = false;
      this.showSuccessRequest = false;
      this.showCancelButton = true;
      this.showAcceptButton = false;
      this.showSaveButton = true;
      this.currentUser = "";
    },
    formValidation() {
      let verifyConditions = 0;
      let totalConditions = 9;
      let myRulePassword = /.+[!@#\$%\^\&*\)\(+=._-].+/;
      let correctPassword = myRulePassword.test(this.password);
      let myRuleEmail = /.+@.+\..+/;
      let correctEmail = myRuleEmail.test(this.userEmail);
      // 1.- valido password que sean iguales
      if (this.password == this.samePassword) {
        verifyConditions += 1;
      } else {
        this.password = "";
        this.samePassword = "";
      }
      // 2.- Verificar el tamanio de la cadena
      if (this.password.length >= 6 && this.password.length <= 20) {
        verifyConditions += 1;
      } else {
        this.password = "";
        this.samePassword = "";
      }
      // 3.- Validacion true o false del password
      if (correctPassword) {
        verifyConditions += 1;
      } else {
        this.password = "";
        this.samePassword = "";
      }
      // 4.- Validacion del nombre de usuario
      if (this.userName.length >= 1 && this.userName.length <= 45) {
        verifyConditions += 1;
      } else {
        this.userName = "";
      }
      // 5.- Validacion del primer apellido
      if (this.lastName1.length >= 1 && this.lastName1.length <= 45) {
        verifyConditions += 1;
      } else {
        this.lastName1 = "";
      }
      // 6.- Validacion del segundo apellido
      if (this.lastName2.length >= 1 && this.lastName2.length <= 45) {
        verifyConditions += 1;
      } else {
        this.lastName2 = "";
      }
      // 7.- Validacion del email del usuario
      if (this.needEmail == false) {
        verifyConditions += 1;
        this.userEmail = "noemail@noemail.com"
      } else if (correctEmail) {
        verifyConditions += 1;
      } else {
        this.userEmail = "";
      }
      // 8.- Validacion del rol de usuario
      if (this.role.length >= 1) {
        verifyConditions += 1;
      } else {
        this.role = "";
      }
      // 9.- Validación de usuario activo
      if (this.userIsActive == true || this.userIsActive == false){
        verifyConditions += 1;
      }
      // Finalmente checamos que sean correcats todas las validaciones
      if (verifyConditions == totalConditions) {
        this.correctForm = true;
        this.showWarningForm = false;
      } else {
        this.correctForm = false;
        verifyConditions = 0;
        this.showWarningForm = true;
      }
    },
    async updateTheUser() {
      this.showCancelButton = false;
      try {
        let userTarget =   this.currentUserToEditJson.user_number;
        let resultGetter = this.$store.getters.currentUser;
        this.currentUser = resultGetter.user_number;
        this.userInterface.user_name = this.userName;
        this.userInterface.user_first_lastname = this.lastName1;
        this.userInterface.user_second_lastname = this.lastName2;
        this.userInterface.user_password = this.password;
        this.userInterface.user_role = this.role;
        this.userInterface.user_status = this.userIsActive;
        this.userInterface.user_email = this.userEmail;
        this.userInterface.user_modified_by = this.currentUser;
        // Aqui la peticion axios
        const backResponse = await axios.put(`user/update/${ userTarget }`, this.userInterface);
        const theData = await backResponse.data;
        const numberValueString = await theData.user_number;
        this.theNewUpdateUser = numberValueString;
        this.showSuccessRequest = true;
        this.showAcceptButton = true;
        this.showCancelButton = false;
        this.showSaveButton = false;
      } catch (e) {
        this.showSuccessRequest = false;
        this.showCancelButton = false;
        this.showErrorRequest = true;
        this.showAcceptButton = true;
      }
    },
    cancelUpdateUser() {
      this.correctForm = false;
      this.$router.push({ name: 'ListUpdateUser' });
    }
  },
};
</script>
