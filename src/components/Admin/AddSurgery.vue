<template>
  <v-container fluid>
        <v-card>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="12" xl="6" lg="6" md="6">
                <v-text-field outlined v-model="name" label="Praxisname"></v-text-field>
                <v-textarea outlined v-model="description" label="Beschreibung"></v-textarea>
                <v-text-field outlined v-model="plz" label="PLZ"></v-text-field>
                <v-text-field outlined v-model="city" label="Ort"></v-text-field>
                <v-text-field outlined v-model="phone" label="Telefonnummer"></v-text-field>
                <v-text-field outlined v-model="email" label="Email"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center">
              <v-btn @click="addSurgery">Neue Praxis hinzufügen</v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      description: null,
      plz: null,
      city: null,
      phone: null,
      email: null
    }
  },
  methods: {
    addSurgery(){
      this.$emit('createSurgery', {
        surgery: {
          name: this.name,
          description: this.description,
          plz: this.plz,
          city: this.city,
          phone: this.phone,
          email: this.phone
        }
      })
    }
  },
};
</script>

<style scoped>
</style>