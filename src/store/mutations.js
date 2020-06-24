export default {
  setUserToken(state, token) {
    state.userToken = token
  },
  removeUserToken(state) {
    this.state.userToken = null
  },
  setIsAdmin(state) {
    this.state.isAdmin = true
  },
  removeIsAdmin(state) {
    this.state.isAdmin = false
  },
  setUserId(state, id) {
    this.state.userId = id
  }
}