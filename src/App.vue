<template>
  <v-app id="inspire">
    <v-app-bar app color="blue darken-3" dark fixed>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>App Notes</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary v-if="isLogged">
      <v-list dense>
        <template
          v-if="checkAdmin || checkOperatorCargo || checkLaboratoryRole"
        >
          <v-list-item :to="{ name: 'Dashboard' }">
            <v-list-item-action>
              <v-icon color="primary">mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
        </template>
        <!-- Desplegable del administrador -->
        <template v-if="checkAdmin">
          <v-list-group :value="false" prepend-icon="mdi-book-open">
            <template v-slot:activator>
              <v-list-item-title>Notes</v-list-item-title>
            </template>
            <!-- List Notes -->
            <v-list-item :to="{ name: 'NotesArea' }">
              <v-list-item-action>
                <v-icon color="blue">mdi-clipboard-edit-outline</v-icon>
              </v-list-item-action>
              <v-list-item-title>List Notes</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>
        <!-- Cierre de sesion -->
        <template>
          <v-list-item @click="goToLogin">
            <v-list-item-action>
              <v-icon color="red lighten-3">mdi-exit-run</v-icon>
            </v-list-item-action>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- Contenedor principal de componente -->
    <v-main>
      <v-container class="fill-height" fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
@import "../node_modules/typeface-roboto/index.css";
.app {
  padding-top: 30px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>

<script>
/* import HelloWorld from './components/HelloWorld'; */

export default {
  name: "App",
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    isLogged() {
      return this.$store.state.user;
    },
    checkAdmin() {
      return (
        this.$store.state.user &&
        this.$store.state.user.user_role == "admin"
      );
    },
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
  methods: {
    goToLogin() {
      //this.$router.push({name:'login'});
      this.$store.dispatch("outUser");
    },
  },
};
</script>
