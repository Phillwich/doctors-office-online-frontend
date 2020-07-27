<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="5" lg="5" md="5">
        <v-card flat>
          <v-tabs v-model="tab" centered>
            <v-tabs-slider></v-tabs-slider>
            <v-row justify="center">
              <v-tab href="#tab-1">Praxis erstellen</v-tab>
              <v-tab href="#tab-2">Alle anzeigen</v-tab>
            </v-row>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <AddSurgery @createSurgery="addSurgery" />
            </v-tab-item>

            <v-tab-item value="tab-2">
              <ListSurgery />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

import AddSurgery from "../components/Admin/AddSurgery";
import ListSurgery from "../components/Admin/ListSurgery";

export default {
  data() {
    return {
      tab: null
    };
  },
  components: {
    AddSurgery,
    ListSurgery
  },
  methods: {
    ...mapActions(["registerSurgery"]),
    async addSurgery(surgery) {
      try {
        await this.registerSurgery(surgery);
        this.tab = "tab-2";
      } catch (error) {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style scoped>
</style>