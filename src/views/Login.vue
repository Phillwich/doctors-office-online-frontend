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
      const response = await this.login(userData)

      if (response.success) this.$router.push(`/user/${response.data.user._id}`)
    }
  }
}
</script>