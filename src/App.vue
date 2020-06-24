<template>
  <v-app class="app">
    <Toolbar @open-NavigationBar="setNavigationBar" @push="navigateTo" :show="show" :menuItems="menuItems" id="toolbar"/>
    <NavigationBar @close-NavigationBar="setNavigationBar" @push="navigateTo" :show="show" :menuItems="menuItems"/>
    <router-view id="main_section" />
    <!-- <Footer id="footer"/> -->
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar"
import NavigationBar from "./components/NavigationBar"
// import Footer from "./components/Footer"

export default {
  name: "App",
  components: {
    Toolbar,
    NavigationBar,
    // Footer
  },
  data() {
    return {
      show: false,
      menuItems: [
        { icon: "mdi-home", title: "Startseite", link: "/" },
        { icon: "mdi-information-outline", title: "Info", link: "/info" },
        { icon: "mdi-login", title: "Login", link: "/login" },
        { icon: "mdi-pencil", title: "Registrieren", link: "/register" },
        { icon: "mdi-account", title: "Account", link: `/user${this.$route.params.userId}`}
      ]
    };
  },
  methods: {
    setNavigationBar(value) {  
      this.show = value
    }, 
    navigateTo(value) {
      this.$router.push(value)
    }
  }
};
</script>

<style>
.app {
  width: 100vw;
}

#main_section {
  height: 100%;
}

/* #footer {
  position: absolute;
  bottom: 0;
} */
</style>