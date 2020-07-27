<template>
  <Login @userLogin="userLogin"/>
</template>

<script>
import Login from "../components/Login"
import { mapActions } from 'vuex'

export default {
  components: {
    Login
  },
  methods: {
    ...mapActions(['login']),
    async userLogin(userData) {
      try {
      const response = await this.login(userData)
      this.$router.push(`/surgery`)
      } catch (error) {
        if (this.$route.path !== '/login') {
          this.$router.push('/login')
        }
      }
    }
  }
}
</script>