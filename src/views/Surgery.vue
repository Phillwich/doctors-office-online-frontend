<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="10" xl="6" lg="4" md="6">
        <template v-for="item in surgeries">
          <v-card :key="item._id">
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-text>
              <v-row justify="center" align="center">
                <v-col>
                  <v-textarea outlined disabled v-model="item.description"></v-textarea>
                </v-col>
                <v-col cols="12" xl="6" lg="6">
                  <v-text-field outlined disabled :value="formatCity(item)"></v-text-field>
                  <v-text-field outlined disabled v-model="item.phone"></v-text-field>
                  <v-text-field outlined disabled v-model="item.email"></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-row justify="start">
                  <v-btn @click="pushRoute(item._id)">Termin vereinbaren</v-btn>
                </v-row>
              </v-card-actions>
            </v-card-text>
          </v-card>
          <br :key="item.name"/>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      surgeries: null
    };
  },
  async mounted() {
    const response = await this.getSurgeries()
    this.surgeries = response.data
  },
  methods: {
    ...mapActions(["getSurgeries"]),
    formatCity(item) {
      return item.plz + " " + item.city
    },
    pushRoute(surgeryId) {
      this.$router.push(`/surgery/${surgeryId}`)
    }
  }
};
</script>