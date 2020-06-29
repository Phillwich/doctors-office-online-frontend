import axios from "axios"

import { getRequest, deleteRequest, postRequest } from "../utils/axios"
import store from "../store"

export default {
  register: async ({ Commit }, user) => {
    try {
      const response = await axios.post('http://localhost:3000/register', user)
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
      const response = await axios.post('http://localhost:3000/login', userData)
      sessionStorage.setItem('token', response.data.data.token)
      sessionStorage.setItem('userId', response.data.data.user._id)
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
      const response = await getRequest(`http://localhost:3000/user/${userId}`, store.state.userToken)
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
      const response = await postRequest('http://localhost:3000/surgery', surgery, store.state.userToken)
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
      const response = await axios.get('http://localhost:3000/surgery')
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
      const response = await getRequest(`http://localhost:3000/surgery/${surgerId}`, store.state.userToken)
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
      const response = await deleteRequest(`http://localhost:3000/surgery/${surgerId}`)
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