<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="8" lg="8" md="6">
        <v-card>
          <v-card-title>{{surgery.name}}</v-card-title>
          <v-card-text>
            <v-row justify="center" align="center">
              <v-col>
                <v-textarea outlined readonly v-model="surgery.description"></v-textarea>
              </v-col>
              <v-col>
                <v-text-field outlined readonly :value="formatCity(surgery)"></v-text-field>
                <v-text-field outlined readonly v-model="surgery.phone"></v-text-field>
                <v-text-field outlined readonly v-model="surgery.email"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" xl="8" lg="8" md="6">
        <Calendar />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

import Calendar from "../components/Surgery/Calendar"

export default {
  components: {
    Calendar
  },
  data() {
    return {
      surgery: {}
    };
  },
  async mounted() {
    const surgeryId = this.$route.params.id;

    try {
      const response = await this.getSurgeryInformation(surgeryId);
      this.surgery = response;
    } catch (error) {
      this.$router.push("/login");
    }
  },
  methods: {
    ...mapActions(["getSurgeryInformation"]),
    formatCity(surgery) {
      return `${surgery.plz} ${surgery.city}`;
    }
  }
};
</script>

<style scoped>
</style>