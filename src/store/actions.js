import axios from "axios"

import { BACKEND_URL } from "../../config/default"
import { getRequest, deleteRequest, postRequest, putRequest } from "../utils/axios"
import store from "../store"

export default {
  register: async ({ Commit }, user) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/register`, user)
      return {
        success: true, 
        data: response.data.data
      }
    } catch (error) {
      return {
        success: false
      }
    }
  },

  login: async ({ commit }, userData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/login`, userData)
      sessionStorage.setItem('token', response.data.data.token)
      sessionStorage.setItem('userId', response.data.data.user._id)
      sessionStorage.setItem('isAdmin', true)
      commit('setUserToken', response.data.data.token)
      commit('setUserId', response.data.data.user._id)
      if (response.data.data.user.isAdmin) commit('setIsAdmin')
      return {
        success: true,
        data: response.data.data
      }
    } catch (error) {
      console.log(error)
      return {
        success: false
      }
    }
  },

  getUserInformation: async ({ commit }, userId) => {
    try {
      const response = await getRequest(`${BACKEND_URL}/user/${userId}`, store.state.userToken)
      return {
        success: true, 
        data: response.data
      }
    } catch (error) {
      return {
        success: false
      }
    }
  },

  registerSurgery: async ({ commit }, surgery) => {
    try {
      const response = await postRequest(`${BACKEND_URL}/surgery`, surgery, store.state.userToken)
      console.log(response)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.log(error)
      return {
        success: false
      }
    }
  },

  getSurgeries: async ({ commit }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/surgery`)
      return {
        success: true,
        data: response.data.data
      }
    } catch (error) {
      return {
        success: false
      }
    }
  },

  getSurgeryInformation: async ({ commit }, surgerId) => {
    try {
      const response = await getRequest(`${BACKEND_URL}/surgery/${surgerId}`, store.state.userToken)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false
      }
    }
  },

  deleteSurgery: async ({ commit }, surgerId) => {
    try {
      const response = await deleteRequest(`${BACKEND_URL}/surgery/${surgerId}`, store.state.userToken)
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false
      }
    }
  },

  deleteUser: async ({ commit }, userId) => {
    console.log('Hier bin ich ')
    try {
      const response = await deleteRequest(`${BACKEND_URL}/user/${userId}`, store.state.userToken)
      commit('removeUserToken')
      commit('removeIsAdmin')
      commit('setUserId', null)
      sessionStorage.removeItem('isAdmin')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false
      }
    }
  },

  updateUser: async ({ commit }, user) => {
    try {
      const response = await putRequest(`${BACKEND_URL}/user`, user, store.state.userToken)

      return {
        success: true
      }
    } catch (error) {
      return {
        success: false
      }
    }
  }

}