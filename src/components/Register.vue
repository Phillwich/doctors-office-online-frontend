<template>
  <v-container fluid>
    <v-row align="center" id="register_section">
      <v-col cols="12">
        <v-card shaped flat raised id="register_middle_section">
          <v-row align="center" justify="space-around">
            <v-col cols="12" xl="4" lg="4" md="4" class="hidden-md-and-down">
              <span>Hier könnt ihr euch registrieren um zukünftig euren Arztbesuch zu jeder Zeit von überall aus zu machen.</span>
            </v-col>
            <v-col cols="12" xl="4" lg="4" md="4" sm="6" xs="2">
              <v-card flat shaped>
                <v-card-title>
                  <v-row justify="center">Registrierung</v-row>
                </v-card-title>

                <v-card-text>
                  <v-text-field outlined v-model="firstname" label="Vorname"></v-text-field>
                  <v-text-field outlined v-model="lastname" label="Nachname"></v-text-field>
                  <v-text-field outlined v-model="email" label="Email"></v-text-field>
                  <v-text-field outlined v-model="password" type="password" label="Password"></v-text-field>
                  <v-text-field outlined type="password" v-model="passwordTest" label="Password Check"></v-text-field>
                </v-card-text>

                <v-card-actions>
                  <v-row justify="center">
                    <v-btn color="grey" @click="register">Registrieren</v-btn>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      passwordTest: null
    }
  },
  methods: {
    register() {
      if (this.password !== this.passwordTest) {
        this.password = null
        this.passwordTest = null
        return alert('Passwörter stimmen nicht über ein')
      }
      this.$emit('registerUser', {
        user: {
          firstName: this.firstname,
          lastName: this.lastname,
          email: this.email,
          password: this.password
        }
      })
    }
  },
};
</script>

<style scoped>
#register_section {
  height: 100vh;
}
#register_middle_section {
  height: 50%;
  background-color: #2b50f5;
}
</style>