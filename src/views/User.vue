<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="5" lg="5" md="5">
        <v-card flat>
          <v-tabs v-model="tab" centered>
            <v-tabs-slider></v-tabs-slider>

            <v-row justify="center">
              <v-tab href="#tab-1">Profil</v-tab>
              <v-tab href="#tab-2">Termine</v-tab>
              <v-tab href="#tab-3">Einstellungen</v-tab>
            </v-row>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-card>
                <v-row justify="center">
                  <v-card-title>Profil</v-card-title>
                </v-row>
                <v-row justify="start" class="pl-4 pr-4">
                  <v-card-text class="pl-10 pr-10">
                    <v-text-field outlined solo v-model="firstName" readonly></v-text-field>
                    <v-text-field outlined solo v-model="lastName" readonly></v-text-field>
                    <v-text-field outlined solo v-model="email" readonly></v-text-field>
                  </v-card-text>
                </v-row>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-2">
              <v-card>
                <v-row justify="center">
                  <v-card-title>Termine</v-card-title>
                </v-row>
                <v-row justify="start" class="pl-4 pr-4">
                  <template v-for="item in appointments">
                    <v-col cols="12" :key="item.id">
                      <v-card>
                        <v-card-text :key="item.description" class="pl-10 pr-10">
                          <v-text-field outlined readonly :value="formatDate(item.date)"></v-text-field>
                          <v-textarea outlined readonly :value="item.description"></v-textarea>
                        </v-card-text>
                        <v-card-actions>
                          <v-row justify="end">
                            <v-btn icon color="red" class="mr-4">
                              <v-icon @click="removeAppointment(item)">mdi-delete</v-icon>
                            </v-btn>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </template>
                </v-row>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-3">
              <v-card>
                <v-row justify="center">
                  <v-card-title>Einstellungen</v-card-title>
                </v-row>
                <v-row justify="start" class="pl-4 pr-4">
                  <v-card-text class="pl-10 pr-10">
                    <v-card class="mt-4">
                      <v-card-title>Password ändern</v-card-title>
                      <v-card-text>
                        <v-form v-model="valid">
                          <v-text-field
                            required
                            :rules="inputRule"
                            label="Neues Password"
                            outlined
                            v-model="password"
                            type="password"
                          ></v-text-field>
                          <v-text-field
                            required
                            :rules="inputRule"
                            label="Password wiederholen"
                            outlined
                            v-model="passwordTest"
                            type="password"
                          ></v-text-field>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-row justify="end">
                          <v-btn class="mr-4" :disabled="!valid" @click="updateAccount">Passwort aktualisieren</v-btn>
                        </v-row>
                      </v-card-actions>
                      <v-card-title>Profil löschen</v-card-title>
                      <v-card-text>Wenn Sie ihr Profil löschen, werden alle Daten und Informationen entgültig gelöscht und können nicht wiedergeholt werden</v-card-text>
                      <v-card-actions>
                        <v-row justify="end">
                          <v-btn class="mr-4" color="red" @click="deleteAccount">Account löschen</v-btn>
                        </v-row>
                      </v-card-actions>
                    </v-card>
                  </v-card-text>
                </v-row>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      valid: false,
      firstName: null,
      lastName: null,
      email: null,
      tab: null,
      password: null,
      passwordTest: null,
      appointments: null,
      inputRule: [v => !!v || "Darf nicht leer sein"]
    };
  },
  methods: {
    ...mapActions([
      "getUserInformation",
      "updateUser",
      "deleteUser",
      "getAppointments",
      "deleteAppointment"
    ]),
    async deleteAccount() {
      const userId = this.$route.params.userId;
      const response = await this.deleteUser(userId);
      if (response.success) {
        this.$router.push("/");
      }
    },
    async updateAccount() {
      if (this.password !== this.passwordTest) {
        window.alert("Passwörter müssen übereinstimmen");
        this.password = null;
        this.passwordTest = null;
      }
      const userId = this.$route.params.userId;
      try {
        const response = await this.updateUser({
          user: {
            _id: userId,
            password: this.password
          }
        });
      } catch (error) {
        this.$router.push("/login");
      }
    },
    async removeAppointment(appointment) {
      try {
        const response = await this.deleteAppointment(appointment._id);
      } catch (error) {
        alert("Konnte Termin nicht löschen");
      }
    },
    formatDate(uglyDateFormat) {
      moment.locale("de");
      return moment(uglyDateFormat).format("DD.MM.YYYY [-] HH:mm [Uhr]");
    }
  },
  async mounted() {
    const userId = this.$route.params.userId;

    try {
      const response = await this.getUserInformation(userId);
      this.firstName = response.firstName;
      this.lastName = response.lastName;
      this.email = response.email;
    } catch (error) {
      return this.$router.push("/login");
    }

    try {
      const appointmentResponse = await this.getAppointments(userId);
      this.appointments = appointmentResponse;
    } catch (error) {
      return this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
#user_site {
  height: 90vh;
}
</style>