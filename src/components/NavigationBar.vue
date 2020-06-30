<template>
  <v-navigation-drawer v-model="drawer" absolute temporary right width="200">
    <v-list dense>
      <v-list-item link @click="pushRoute('/')">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Starseite</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="pushRoute('/surgery')">
        <v-list-item-icon>
          <v-icon>mdi-calendar-blank</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Übersicht</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="pushRoute('/login')" v-if="!userToken">
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="pushRoute('/user')" v-if="userToken">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Mein Account</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="logout()" v-if="userToken">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Abmelden</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: ["show"],
  data() {
    return {
      drawer: null
    };
  },
  computed: {
    ...mapState(["userToken", 'userId'])
  },
  methods: {
    ...mapMutations(['removeUserToken']),
    pushRoute(route) {
      if (route === '/user' && this.userId !== null) route = `${route}/${this.userId}`
      this.$emit("push", route);
    },
    logout() {
      this.removeIsAdmin()
      this.removeUserToken()
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('isAdmin')
      this.pushRoute('/')
    }
  },
  watch: {
    show(value) {
      this.drawer = value;
    },
    drawer() {
      if (!this.drawer) {
        this.$emit("close-NavigationBar", false);
      }
    }
  }
};
</script>