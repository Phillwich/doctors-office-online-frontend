<template>
  <v-container fluid>
    <template v-for="item in surgeries">
      <v-card :key="item._id">
        <v-card-title>{{item.name}}</v-card-title>
        <v-card-text>
          <v-row justify="center" align="center">
            <v-col>
              <v-textarea outlined :disabled="edit" v-model="item.description"></v-textarea>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <v-text-field outlined disabled :value="formatCity(item)"></v-text-field>
              <v-text-field outlined :disabled="edit" v-model="item.phone"></v-text-field>
              <v-text-field outlined :disabled="edit" v-model="item.email"></v-text-field>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-row v-if="edit" justify="space-around">
              <v-btn @click="edit = !edit">Bearbeiten</v-btn>
            </v-row>
            <v-row v-if="!edit" justify="space-around">
              <v-btn @click="update(item)" color="green">Speichern</v-btn>
              <v-btn @click="edit = !edit">Abbrechen</v-btn>
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
      surgeries: [],
      edit: true
    };
  },
  methods: {
    ...mapActions(["getSurgeries", "updateSurgery"]),
    formatCity(item) {
      return `${item.plz} ${item.city}`;
    },
    async getAllSurgeries() {
      try {
        const response = await this.getSurgeries();
        this.surgeries = response;
      } catch (error) {
        this.$router.push('/login')
      }
    },
    async update(data) {
      this.edit = true;
      const response = await this.updateSurgery({
        surgery: data
      });
    }
  },
  async mounted() {
    await this.getAllSurgeries();
  }
};
</script>

<style scoped>
</style>