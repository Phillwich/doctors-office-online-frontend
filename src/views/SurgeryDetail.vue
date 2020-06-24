<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="6" lg="4" md="4">
        <v-card>
          <v-card-title>{{surgery.name}}</v-card-title>
          <v-card-text>
            <v-row justify="center" align="center">
              <v-col>
                <v-textarea outlined disabled v-model="surgery.description"></v-textarea>
              </v-col>
              <v-col>
                <v-text-field outlined disabled :value="formatCity(surgery)"></v-text-field>
                <v-text-field outlined disabled v-model="surgery.phone"></v-text-field>
                <v-text-field outlined disabled v-model="surgery.email"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      surgery: {}
    };
  },
  async mounted() {
    const surgeryId = this.$route.params.id;
    const response = await this.getSurgeryInformation(surgeryId);

    if (!response.success) return this.$router.push('/login')
    
    this.surgery = response.data;
  },
  methods: {
    ...mapActions(["getSurgeryInformation"]),
    formatCity(surgery) {
      return `${surgery.plz} ${surgery.city}`
    }
  }
};
</script>

<style scoped>
</style>