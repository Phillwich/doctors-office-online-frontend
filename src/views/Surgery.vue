<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="10" xl="6" lg="4" md="6">
        <div v-if="surgeries.length">
          <template v-for="item in surgeries">
            <v-card :key="item._id" outlined shaped>
              <v-card-title>{{item.name}}</v-card-title>
              <v-card-text>
                <v-row justify="center" align="center">
                  <v-col>
                    <v-textarea outlined readonly v-model="item.description"></v-textarea>
                  </v-col>
                  <v-col cols="12" xl="6" lg="6">
                    <v-text-field outlined readonly :value="formatCity(item)"></v-text-field>
                    <v-text-field outlined readonly v-model="item.phone"></v-text-field>
                    <v-text-field outlined readonly v-model="item.email"></v-text-field>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <v-row justify="start">
                    <v-btn @click="pushRoute(item._id)">Termin vereinbaren</v-btn>
                  </v-row>
                </v-card-actions>
              </v-card-text>
            </v-card>
            <br :key="item.name" />
          </template>
        </div>
        <div v-else>
          <v-card>
            <v-card-text>
              <v-row justify="center">
                <span> Leider noch keine Paxis vorhanden</span>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
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
  async mounted() {
    try {
      const response = await this.getSurgeries();
      this.surgeries = response;
    } catch (error) {
      this.$router.push("/login");
    }
  },
  methods: {
    ...mapActions(["getSurgeries"]),
    formatCity(item) {
      return item.plz + " " + item.city;
    },
    pushRoute(surgeryId) {
      this.$router.push(`/surgery/${surgeryId}`);
    }
  }
};
</script>

<style scoped>
</style>