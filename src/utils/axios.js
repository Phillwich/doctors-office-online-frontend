import axios from "axios"

const postRequest = async (url, requestBody, header) => {
  try {
    const response = await axios.post(url, requestBody, { headers: { 'authorization': header ? header : '' } })
    return {
      data: response.data,
      authorized: response.status !== 1 ? true : false,
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const putRequest = async (url, requestBody, header) => {
  try {
    const response = await axios.put(url, requestBody, { headers: { 'authorization': header ? header : '' } })
    return {
      data: response.data,
      authorized: response.status !== 401 ? true : false,
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const getRequest = async (url, header) => {
  try {
    const response = await axios.get(url, { headers: { 'authorization': header ? header : '' } })
    return {
      data: response.data,
      authorized: response.status !== 401 ? true : false,
    }
  } catch (error) {
    throw new Error(error.message)
  }
}


const deleteRequest = async (url, header) => {
  try {
    const response = await axios.delete(url, { headers: { 'authorization': header ? header : '' } })
    return {
      data: response.data,
      authorized: response.status !== 401 ? true : false,
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest
}