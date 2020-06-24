<template>
  <Register @registerUser="registerUser" />
</template>

<script>
import Register from '../components/Register'
import { mapActions } from 'vuex'

export default {
  components: {
    Register
  },
  methods: {
    ...mapActions(['register']),
    async registerUser(user) {
      const response = await this.register(user)
      if (response) this.$router.push('/login')
    }
  },
}
</script>