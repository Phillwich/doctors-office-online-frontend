<template>
  <v-toolbar flat>
    <v-toolbar-title>
      <span :class="{'display-1': $vuetify.breakpoint.smAndUp}">Doctors Office Online</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="hidden-sm-and-down">
      <v-btn text @click="pushRoute('/')">Startseite</v-btn>
      <v-btn text @click="pushRoute('/surgery')">Übersicht</v-btn>
      <v-btn text @click="pushRoute('/login')" v-if="!userToken">Login</v-btn>
      <v-menu bottom left v-if="userToken">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="pb-1" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="pushRoute('/user')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mein Account</v-list-item-title>
          </v-list-item>

          <v-list-item @click="pushRoute('/admin')" v-if="isAdmin">
            <v-list-item-icon>
              <v-icon>mdi-account-key</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="hidden-md-and-up">
      <v-btn icon @click.stop="openNavigationBar()">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: ["show"],
  data() {
    return {
      navigationDrawer: false
    };
  },
  computed: {
    ...mapState(["userToken", "isAdmin", "userId"])
  },
  methods: {
    ...mapMutations(["removeUserToken", "removeIsAdmin"]),
    openNavigationBar() {
      this.$emit("open-NavigationBar", !this.navigationDrawer);
    },
    pushRoute(route) {
      if (route === '/user' && this.userId !== null) route = `${route}/${this.userId}`
      this.$emit("push", route);
    },
    logout() {
      this.removeIsAdmin()
      this.removeUserToken()
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
      this.pushRoute("/");
    }
  },
  watch: {
    show(value) {
      this.navigationDrawer = value;
    }
  }
};
</script>

<style scoped>
</style>