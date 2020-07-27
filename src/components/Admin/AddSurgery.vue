<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row justify="center">
          <v-col cols="12" xl="6" lg="6" md="6">
            <v-form v-model="valid">
              <v-text-field required :rules="inputRule" outlined v-model="name" label="Praxisname"></v-text-field>
              <v-textarea
                required
                :rules="inputRule"
                outlined
                v-model="description"
                label="Beschreibung"
              ></v-textarea>
              <v-text-field required :rules="inputRule" outlined v-model="plz" label="PLZ"></v-text-field>
              <v-text-field required :rules="inputRule" outlined v-model="city" label="Ort"></v-text-field>
              <v-text-field
                required
                :rules="inputRule"
                outlined
                v-model="phone"
                label="Telefonnummer"
              ></v-text-field>
              <v-text-field required :rules="inputRule" outlined v-model="email" label="Email"></v-text-field>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row justify="center">
          <v-btn @click="addSurgery" :disabled="!valid">Neue Praxis hinzufügen</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      name: null,
      description: null,
      plz: null,
      city: null,
      phone: null,
      email: null,
      inputRule: [v => !!v || "Darf nicht leer sein"]
    };
  },
  methods: {
    addSurgery() {
      this.$emit("createSurgery", {
        surgery: {
          name: this.name,
          description: this.description,
          plz: this.plz,
          city: this.city,
          phone: this.phone,
          email: this.email,
          appointments: []
        }
      });
    }
  }
};
</script>

<style scoped>
</style>