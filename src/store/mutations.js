export default {
  setUser(state, user) {
    this.state.userId = user.userId
    this.state.userToken = user.userToken
    this.state.isAdmin = user.isAdmin
    sessionStorage.setItem('token', user.userToken)
    sessionStorage.setItem('userId', user.userId)
    sessionStorage.setItem('isAdmin', user.isAdmin)
  },
  resetUser(state) {
    this.state.userId = null
    this.state.userToken = null
    this.state.isAdmin = false
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('isAdmin')
  }
}