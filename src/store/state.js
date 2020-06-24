export default {
  userToken: sessionStorage.getItem('token') || null,
  userId: sessionStorage.getItem('userId') || null,
  isAdmin: false
}