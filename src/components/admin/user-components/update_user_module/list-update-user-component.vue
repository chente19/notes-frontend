<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
          <v-toolbar flat color="light-green lighten-4">
            <v-icon color="blue" left>mdi-account-convert</v-icon>
            <v-toolbar-title>Listado de Usuarios</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="listRecordsUsers"
              >Actualizar lista</v-btn
            >
          </v-toolbar>
          <br />
          <v-container>
            <v-text-field
              class="text-xs-center"
              v-model="searchNumber"
              label="Busqueda por No. de Usuario"
              :rules="searcRules"
            >
              <v-icon slot="append" color="green" @click="searchRecord" large>
                mdi-magnify
              </v-icon>
            </v-text-field>
          </v-container>
          <br />
          <v-container>
            <br />
            <v-divider></v-divider>
            <div>
              <p class="font-weight-bold">
                No. de usuarios:
              </p>
            </div>
            <v-row class="text-center">
              <v-col>
                <v-icon
                  color="light-green darken-3"
                  large
                  class="mr-2"
                  @click="leftRecordsPaginate"
                >
                  mdi-arrow-left-bold
                </v-icon>
              </v-col>
              <v-col class="font-weight-bold light-green darken-3 white--text">
                {{ paginationNumber }}
                -
                {{ paginationNumber + jumpPaginator }}
              </v-col>
              <v-col>
                <v-icon
                  color="light-green darken-3"
                  large
                  class="mr-2"
                  @click="rightRecordsPaginate"
                >
                  mdi-arrow-right-bold
                </v-icon>
              </v-col>
            </v-row>
            <br />
            <v-divider></v-divider>
            <br />
            <template>
              <v-data-table
                :headers="headers"
                :items="recordArrayCargo"
                class="elevation-1"
              >
                <!-- modal en posicion top despues de click en icono -->
                <template v-slot:top>
                  <v-dialog
                    v-model="dialog"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    <v-card id="report-card">
                      <v-toolbar dark color="primary">
                        <v-toolbar-title>Detalles de Usuario</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <v-btn dark text @click="savePDF">
                            <v-icon>mdi-file-pdf</v-icon>
                            <span>guardar pdf</span>
                          </v-btn>
                        </v-toolbar-items>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <v-btn dark text @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                            <span>Cerrar</span>
                          </v-btn>
                        </v-toolbar-items>
                      </v-toolbar>
                      <br />
                      <template>
                        <v-container>
                          <v-divider></v-divider>
                          <div>
                            <p class="font-weight-bold">
                              No. de Usuario
                            </p>
                            <p class="font-weight-regular">
                              {{ modalDataJson.user_number }}
                            </p>
                          </div>
                          <br />
                          <v-divider></v-divider>
                          <div>
                            <p class="font-weight-bold">
                              Rol de Usuario
                            </p>
                            <p class="font-weight-regular">
                              {{ modalDataJson.user_role }}
                            </p>
                          </div>
                          <br />
                          <v-divider></v-divider>
                          <div>
                            <p class="font-weight-bold">
                              Nombre
                            </p>
                            <p class="font-weight-regular">
                              {{ modalDataJson.user_name }}
                            </p>
                          </div>
                          <br />
                          <v-divider></v-divider>
                          <div>
                            <p class="font-weight-bold">
                              Primer Apellido
                            </p>
                            <p class="font-weight-regular">
                              {{ modalDataJson.user_first_lastname }}
                            </p>
                          </div>
                          <br />
                          <v-divider></v-divider>
                          <div>
                            <p class="font-weight-bold">
                              Segundo Apellido
                            </p>
                            <p class="font-weight-regular">
                              {{ modalDataJson.user_second_lastname }}
                            </p>
                          </div>
                          <br />
                          <v-divider></v-divider>
                          <div>
                            <p class="font-weight-bold">
                              Email
                            </p>
                            <p class="font-weight-regular">
                              {{ modalDataJson.user_email }}
                            </p>
                          </div>
                          <br />
                          <v-divider></v-divider>
                          <div>
                            <p class="font-weight-bold">
                              Usuario Actualizado Por
                            </p>
                            <p class="font-weight-regular">
                              {{ modalDataJson.user_modified_by }}
                            </p>
                          </div>
                          <br />
                          <v-divider></v-divider>
                          <div>
                            <p class="font-weight-bold">
                              Fecha de Modificación
                            </p>
                            <p class="font-weight-regular">
                              {{ modalDataJson.user_modified_on_date }}
                            </p>
                          </div>
                          <br />
                          <v-divider></v-divider>
                          <div>
                            <p class="font-weight-bold">
                              Usuario Creado Por
                            </p>
                            <p class="font-weight-regular">
                              {{ modalDataJson.user_created_by }}
                            </p>
                          </div>
                          <br />
                          <v-divider></v-divider>
                          <div>
                            <p class="font-weight-bold">
                              Fecha de Alta
                            </p>
                            <p class="font-weight-regular">
                              {{ modalDataJson.user_creation_date }}
                            </p>
                          </div>
                          <br />
                          <v-divider></v-divider>
                          <div>
                            <p class="font-weight-bold">
                              ¿El usuario está activo?
                            </p>
                            <p class="font-weight-regular">
                              {{ modalDataJson.user_status }}
                            </p>
                          </div>
                          <br />
                          <v-divider></v-divider>
                          <hr id="gap-warning" />
                          <br />
                          <v-row align="center" justify="space-around">
                            <v-btn
                              class="white--text"
                              elevation="4"
                              color="error"
                              @click="dialog = false"
                            >
                              Cerrar
                            </v-btn>
                            <v-btn
                              class="white--text"
                              elevation="4"
                              color="green"
                              @click="goToEditUser"
                            >
                              Editar
                            </v-btn>
                          </v-row>
                          <br />
                          <hr id="gap-warning" />
                          <br />
                        </v-container>
                      </template>
                    </v-card>
                  </v-dialog>
                </template>
                <!-- Aqui el icono para mostrar detalles -->
                <template v-slot:[`item.detailData`]="{ item }">
                  <v-icon
                    color="light-green darken-2"
                    large
                    class="mr-2"
                    @click="showDataJson(item)"
                    >mdi-card-account-details</v-icon
                  >
                </template>
              </v-data-table>
            </template>
          </v-container>
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
import myPrint from "print-js";
export default {
  data() {
    return {
      searchNumber: "",
      searcRules: [
        (v) => !!v || "Llenar si requieres buscar",
        (v) => /^[1-9]+[0-9]{3}[0-9]*$/.test(v) || "Números arriba de 1000",
        (v) => (v && v.length > 0) || "Verifica que este correcto",
      ],
      // siempre restar 1000 ya que los usuarios inician a partir del No. 1000
      initialUser: 1000,
      paginationNumber: 1000,
      jumpPaginator: 25,
      dialog: false,
      modalDataJson: {},
      headers: [
        {
          text: "No. de Usuario",
          value: "USER_NUMBER",
          sortable: true,
          class: "light-green lighten-4",
        },
        {
          text: "Nombre Usuario",
          value: "user_name",
          class: "light-green lighten-4",
          sortable: true,
        },
        {
          text: "Activo?",
          value: "user_status",
          class: "light-green lighten-4",
          sortable: true,
        },
        {
          text: "Rol Usuario",
          value: "role.role_name",
          class: "light-green lighten-4",
          sortable: false,
        },
        {
          text: "Detalles",
          value: "detailData",
          sortable: false,
          class: "light-green lighten-1",
        },
      ],
      recordArrayCargo: [],
    };
  },
  created() {
    this.listRecordsUsers();
  },

  methods: {
    async showDataJson(recordJson) {
      this.modalDataJson.user_number = recordJson.USER_NUMBER;
      this.modalDataJson.user_name = recordJson.user_name;
      this.modalDataJson.user_first_lastname = recordJson.user_first_lastname;
      this.modalDataJson.user_second_lastname = recordJson.user_second_lastname;
      this.modalDataJson.user_email = recordJson.user_email;
      this.modalDataJson.user_modified_by = recordJson.user_modified_by;
      this.modalDataJson.user_role = recordJson.role.role_name;
      this.modalDataJson.user_modified_on_date =
        recordJson.user_modified_on_date;
      this.modalDataJson.user_created_by = recordJson.user_created_by;
      this.modalDataJson.user_creation_date = recordJson.user_creation_date;
      this.modalDataJson.user_status = recordJson.user_status;
      this.dialog = true;
    },
    listRecordsUsers() {
      let myComponent = this;
      let currentPaginateUser = this.paginationNumber;
      axios
        .get(`user/paginate/${currentPaginateUser}`)
        .then((response) => {
          myComponent.recordArrayCargo = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    leftRecordsPaginate() {
      try {
        let positionNumber = this.paginationNumber;
        positionNumber -= this.jumpPaginator;
        if (positionNumber < this.initialUser) {
          this.paginationNumber = this.initialUser;
          this.listRecordsUsers();
        } else if (positionNumber == this.paginationNumber) {
          console.log("We are in the same place");
        } else {
          this.paginationNumber = positionNumber;
          this.listRecordsUsers();
        }
      } catch (error) {
        this.positionNumber = this.initialUser;
        this.listRecordsUsers();
      }
    },
    rightRecordsPaginate() {
      try {
        let positionNumber = this.paginationNumber;
        positionNumber += this.jumpPaginator;
        if (positionNumber < this.initialUser) {
          this.paginationNumber = this.initialUser;
          this.listRecordsUsers();
        } else if (this.recordArrayCargo.length <= 0) {
          console.log("No more records ahead");
        } else if (positionNumber == this.paginationNumber) {
          console.log("We are in the same place");
        } else {
          this.paginationNumber = positionNumber;
          this.listRecordsUsers();
        }
      } catch (error) {
        this.positionNumber = this.initialUser;
        this.listRecordsUsers();
      }
    },
    searchRecord() {
      let ruleNumber = /^[1-9]+[0-9]{3}[0-9]*$/;
      let resultCheckNumber = ruleNumber.test(this.searchNumber);
      if (resultCheckNumber) {
        this.paginationNumber = parseInt(this.searchNumber);
        this.listRecordsUsers();
      } else {
        this.paginationNumber = 0;
        this.listRecordsUsers();
      }
    },
    goToEditUser() {
      let jsonToStorage = JSON.stringify(this.modalDataJson);
      localStorage.setItem("ltoEditUser", jsonToStorage);
      this.$router.push({ name: "UpdateOneUser" });
    },
    savePDF() {
      console.log("Guardado de PDF");
      myPrint({
        printable: "report-card",
        type: "html",
        header: "Reporte de:",
        scanStyles: true,
      });
    },
  },
};
</script>
