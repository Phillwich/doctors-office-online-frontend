<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xl="4" lg="4">
        <v-card>
          <v-card-title>
            <v-row justify="center">Login</v-row>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="email" label="Email" outlined></v-text-field>
            <v-text-field v-model="password" type="password" label="Password" outlined></v-text-field>
            <v-row justify="end">
              <span @click="routerPush" id="register_button"> Noch nicht registriert? Jetzt Registrieren! </span>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row justify="space-around">
              <v-btn color="grey" @click="loginUser">Login</v-btn>
              <!-- <v-btn color="grey" @click="routerPush">Jetzt registrieren</v-btn> -->
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    loginUser() {
      return this.$emit("userLogin", {
        userData: {
          email: this.email,
          password: this.password
        }
      });
    },
    routerPush() {
      return this.$router.push('/register')
    }
  }
};
</script>

<style scoped>
#register_button {
  color: blue;
}
</style>