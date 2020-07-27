<template>
  <v-container>
    <v-row justify="center" v-if="success">
      <v-col cols="12">
        <v-alert type="success">{{dialogMessage}}</v-alert>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" xl="8" lg="8" md="6">
        <v-card>
          <v-card-title>Vereinbare einen Termin</v-card-title>
          <v-card-text>Hier kannst du jederzeit deinen ganz persönlichen Termin ausmachen. Egal wann und von wo. Gib einfach ein Datum und eine Uhrzeit ein und wir überprüfen, ob wir für Sie einen Termin vereinbaren können.</v-card-text>
          <v-card-text>
            <v-form v-model="valid">
              <span>Tag (dd.mm.yyyy)</span>
              <v-text-field required :rules="inputRule" v-model="date" outlined></v-text-field>
              <span>Volle Stunde (hh)</span>
              <v-text-field required :rules="inputRule" v-model="hour" outlined></v-text-field>
            </v-form>
            <span>Beschreibung, sofern nötig</span>
            <v-textarea outlined v-model="description"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="checkAppointment" :disabeld="!valid">Termin vereinbaren</v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" width="35%">
          <v-card>
            <v-card-title>Termin leider nicht verfügbar</v-card-title>
            <v-card-text>Leider konnten wir keinen Termin zu diesem Datum für sie aussmachen. Bitte versuchen sie einen weiteres Datum.</v-card-text>
            <v-card-actions>
              <v-row justify="center">
                <v-btn @click="dialog = !dialog">Schließen</v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      success: false,
      valid: false,
      date: null,
      hour: null,
      description: null,
      dialog: false,
      dialogMessage: null,
      inputRule: [v => !!v || "Darf nicht leer sein"]
    };
  },
  computed: {
    ...mapState(["userId"])
  },
  methods: {
    ...mapActions(["createAppointment"]),
    async checkAppointment() {
      const date = this.createDate();

      try {
        await this.createAppointment({
          appointment: {
            date,
            description: this.description,
            userId: this.userId,
            surgeryId: this.$route.params.id
          }
        });
        this.success = true;
        this.dialogMessage = "Termin erfolgreich erstellt";
        this.date = null;
        this.hour = null;
        this.description = null;
        this.dialog = false;
      } catch (error) {
        this.dialog = true;
        this.dialogMessage =
          "Dieser Slot ist leider nicht mehr verfügbar. Bitte versuchen sie einen anderen.";
      }
    },
    createDate() {
      const newDate = moment(this.date, "DD-MM-YYYY");
      newDate.hour(this.hour);
      return newDate.format();
    }
  }
};
</script>