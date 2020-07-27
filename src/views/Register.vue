<template>
  <Register @registerUser="registerUser" />
</template>

<script>
import { mapActions } from 'vuex'

import Register from '../components/Register'

export default {
  components: {
    Register
  },
  methods: {
    ...mapActions(['register']),

    async registerUser(user) {
      try {
        const response = await this.register(user)
        this.$router.push('/login')
      } catch (error) {
        window.alert('Da ist etwas schief gegangen. Bitte versuche es erneut!')
      }
    }
  },
}
</script>