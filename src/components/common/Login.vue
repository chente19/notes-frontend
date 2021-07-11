<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Inicia sesión</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn :href="source" icon large target="_blank" v-on="on">
                  <v-icon>mdi-phone</v-icon>
                </v-btn>
              </template>
              <span>123456</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="loginInterface.user_number"
                :rules="userNumberRules"
                autofocus
                label="Numero de usuario"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="loginInterface.user_password"
                :rules="passwordRules"
                id="password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-icon="mdi-lock"
                :type="showPass ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                @click:append="showPass = !showPass"
                required
              ></v-text-field>
              <v-flex class="red--text" v-if="errorBackend">
                {{ errorBackend }}
              </v-flex>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn :to="{name: 'Dashboard'}" color="primary">Entrar</v-btn> -->
            <v-btn @click="goIn()" color="primary">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";
export default {
  data() {
    return {
      userNumber: "",
      userNumberRules: [
        (v) => !!v || "Numero de usuario requerido.",
        (v) => (v && v.length >= 4) || "Numero de usuario mayor a 4 digitos",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Contraseña requerida.",
        (v) => (v && v.length >= 6) || "Contraseña muy corta",
        (v) => (v && v.length <= 20) || "Contraseña muy larga",
      ],
      source: "",
      valid: true,
      showPass: false,
      lazy: false,
      isLoading: false,
      fullPage: true,
      errorBackend: "",
      loginInterface: {
        user_number: "",
        user_password: "",
      },
    };
  },
  methods: {
    goIn() {
      axios
        .post("/user/login", this.loginInterface)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.$store.dispatch("saveToken", data.tokenReturn);
          this.$router.push({ name: "Dashboard" });
        })
        .catch((error) => {
          console.log("Not login success -->", error);
          this.errorBackend = null;
          if (error.response.status == 405) {
            this.errorBackend =
              "No existe el usuario o las credenciales son incorrectas";
          } else {
            this.errorBackend = "Acceso no autorizado";
          }
        });
    },
  },
};
</script>
