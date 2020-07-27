import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import Home from '../views/Home.vue'
import Surgery from '../views/Surgery.vue'
import Login from '../views/Login.vue'
import Registrieren from '../views/Register.vue'
import User from '../views/User.vue'
import SurgeryDetail from '../views/SurgeryDetail.vue'
import Admin from '../views/Admin.vue'


const checkSession = (to, from, next) => {
  if (to.name === 'Admin') {
    if (!store.state.isAdmin) next({ name: Login })
  }
  if (!store.state.userToken) {
    next({ name: 'Login' })
  }
  next()
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/surgery',
    name: 'Praxen',
    component: Surgery
  },
  {
    path: '/register',
    name: 'Register',
    component: Registrieren
  },
  {
    path: '/user/:userId',
    name: 'User',
    component: User,
    beforeEnter: checkSession
  },
  {
    path: '/surgery/:id',
    name: 'SurgeryDetail',
    component: SurgeryDetail,
    beforeEnter: checkSession
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: checkSession
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
