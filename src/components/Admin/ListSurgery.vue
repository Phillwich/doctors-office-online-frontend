<template>
  <v-container fluid>
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
            <v-row justify="space-around">
              <v-btn>Bearbeiten</v-btn>
              <v-btn color="red" @click="surgeryDelete(item)">Löschen</v-btn>
            </v-row>
          </v-card-actions>
        </v-card-text>
      </v-card>
      <br :key="item.name" />
    </template>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      surgeries: []
    };
  },
  methods: {
    ...mapActions(["getSurgeries", "deleteSurgery"]),
    formatCity(item) {
      return `${item.plz} ${item.city}`;
    },
    async surgeryDelete(surgery) {
      const response = await this.deleteSurgery(surgery._id);

      if (response.success) {
        await this.getAllSurgeries();
      }
    },
    async getAllSurgeries() {
      const response = await this.getSurgeries();
      this.surgeries = response.data;
    }
  },
  async mounted() {
    await this.getAllSurgeries();
  }
};
</script>

<style scoped>
</style>