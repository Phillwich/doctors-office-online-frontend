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
                    <v-text-field outlined solo v-model="firstName" disabled></v-text-field>
                    <v-text-field outlined solo v-model="lastName" disabled></v-text-field>
                    <v-text-field outlined solo v-model="email" disabled></v-text-field>
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
                  <v-card-text class="pl-10 pr-10">Hier kommen deine Termine hin</v-card-text>
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
                        <v-text-field
                          label="Neues Password"
                          outlined
                          v-model="password"
                          type="password"
                        ></v-text-field>
                        <v-text-field
                          label="Password wiederholen"
                          outlined
                          v-model="passwordTest"
                          type="password"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn @click="updateAccount">Passwort aktualisieren</v-btn>
                      </v-card-actions>
                      <v-card-title>Profil löschen</v-card-title>
                      <v-card-text>Wenn Sie ihr Profil löschen, werden alle Daten und Informationen entgültig gelöscht und können nicht wiedergeholt werden</v-card-text>
                      <v-card-actions>
                        <v-btn color="red" @click="deleteAccount">Account löschen</v-btn>
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
export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      tab: null,
      password: null,
      passwordTest: null
    };
  },
  methods: {
    ...mapActions(["getUserInformation", "updateUser", "deleteUser"]),
    async deleteAccount() {
      const userId = this.$route.params.userId
      const response = await this.deleteUser(userId)
      console.log(response)
      if (response.success) {
        this.$router.push('/')
      }
    },
    async updateAccount() {
      if (this.password !== this.passwordTest) {
        window.alert("Passwörter müssen übereinstimmen");
        this.password = null;
        this.passwordTest = null;
      }
      const userId = this.$route.params.userId
      const response = await this.updateUser({
        user: {
          _id: userId,
          password: this.password
        }
      });
    }
  },
  async mounted() {
    const userId = this.$route.params.userId;
    const response = await this.getUserInformation(userId);

    if (!response.success) return this.$router.push("/login");

    this.firstName = response.data.firstName;
    this.lastName = response.data.lastName;
    this.email = response.data.email;
  }
};
</script>

<style scoped>
#user_site {
  height: 90vh;
}
</style>