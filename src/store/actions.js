import axios from "axios"

import { BACKEND_URL } from "../../config/default"
import { getRequest, deleteRequest, postRequest, putRequest } from "../utils/axios"
import store from "../store"


export default {
  register: async ({ Commit }, user) => {
    try {
      const response = await postRequest(`${BACKEND_URL}/register`, user)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  login: async ({ commit }, userData) => {
    try {
      const response = await postRequest(`${BACKEND_URL}/login`, userData)
      
      commit('setUser', {
        userId: response.data.data.user._id,
        userToken: response.data.data.token,
        isAdmin: response.data.data.user.isAdmin
      })
    
      return response.data
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getUserInformation: async ({ commit }, userId) => {
    try {
      const response = await getRequest(`${BACKEND_URL}/user/${userId}`, store.state.userToken)

      if (!response.authorized) {
        commit("reset")
        throw new Error("Unauthorized")
      }

      return response.data.data
    } catch (error) {
      throw new Error(error.message)
    }
  },

  registerSurgery: async ({ commit }, surgery) => {
    try {
      const response = await postRequest(`${BACKEND_URL}/surgery`, surgery, store.state.userToken)
      
      if (!response.authorized) {
        commit("reset")
        throw new Error("Unauthorized")
      }

      return response.data.data
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getSurgeries: async ({ commit }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/surgery`)
      return response.data.data
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getSurgeryInformation: async ({ commit }, surgerId) => {
    try {
      const response = await getRequest(`${BACKEND_URL}/surgery/${surgerId}`, store.state.userToken)

      if (!response.authorized) {
        commit("reset")
        throw new Error("Unauthorized")
      }

      return response.data.data
    } catch (error) {
      throw new Error(error.message)
    }
  },

  deleteUser: async ({ commit }, userId) => {
    try {
      await deleteRequest(`${BACKEND_URL}/user/${userId}`, store.state.userToken)
      commit("resetUser")
    } catch (error) {
      throw new Error(error.message)
    }
  },

  updateUser: async ({ commit }, user) => {
    try {
      const response = await putRequest(`${BACKEND_URL}/user`, user, store.state.userToken)

      if (!response.authorized) {
        commit("reset")
        throw new Error("Unauthorized")
      }

    } catch (error) {
      throw new Error(error.message)
    }
  },

  updateSurgery: async ({ commit }, surgery) => {
    try {
      const response = await putRequest(`${BACKEND_URL}/surgery`, surgery, store.state.userToken)

      if (!response.authorized) {
        commit("reset")
        throw new Error("Unauthorized")
      }

    } catch (error) { 
      throw new Error(error.message)
    }
  },

  createAppointment: async ({ commit }, appointment) => {
    try {
      const response = await postRequest(`${BACKEND_URL}/appointment`, appointment, store.state.userToken) 

      if (!response.authorized) {
        commit("reset")
        throw new Error("Unauthorized")
      }

    } catch (error) {
      throw new Error(error.message)
    }
  },

  getAppointments: async ({ commit }, userId) => {
    try {
      const response = await getRequest(`${BACKEND_URL}/appointment/${userId}`, store.state.userToken)
      if (!response.authorized) {
        commit("reset")
        throw new Error("Unauthorized")
      }

      return response.data.data
    } catch (error) {
      throw new Error(error.message)
    }
  },

  deleteAppointment: async ({ commit }, appointmentId) => {
    try {
      const response = await deleteRequest(`${BACKEND_URL}/appointment/${appointmentId}`, store.state.userToken)

      if (!response.authorized) {
        commit("reset")
        throw new Error("Unauthorized")
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }
}