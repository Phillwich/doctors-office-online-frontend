export default {
  userToken: sessionStorage.getItem('token') || null,
  userId: sessionStorage.getItem('userId') || null,
  isAdmin: sessionStorage.getItem('isAdmin') || false
}