<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" xl="6" lg="6" md="6">
        <v-card flat>
          <v-card-title>
            <v-row justify="end">
              <v-col cols="12" xl="6" lg="6" md="6">
                <v-row align="center" justify="center">
                  <span>Sei frei und unabhängig!</span>
                </v-row>
                <br />
                <p>
                  Entscheide selber wann du deinen nächste Arzttermin ausmachst.
                  <br />Ganz bequem - zu jeder Zeit, von überall.
                </p>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
      </v-col>

      <v-col cols="12" xl="6" lg="6" md="6">
        <v-btn @click="pushRoute('/surgery')" button>Los geht´s</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    pushRoute(value) {
      this.$router.push(value)
    }
  },
};
</script>
