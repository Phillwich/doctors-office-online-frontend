import axios from "axios"


const postRequest = async (url, requestBody, header) => {
  try {
    const response = await axios.post(url, requestBody, { headers: { 'authorization': header ? header : '' } })
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

const putRequest = async (url, requestBody, header) => {
  try {
    const response = await axios.put(url, requestBody, { headers: { 'authorization': header ? header : '' } })
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

const getRequest = async (url, header) => {
  try {
    const response = await axios.get(url, { headers: { 'authorization': header ? header : '' } })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}


const deleteRequest = async (url, header) => {
  try {
    const response = await axios.delete(url, { headers: { 'authorization': header ? header : '' } })
    return response.data
  } catch (error) {
    throw new Error
  }
}

export {
  postRequest,
  getRequest, 
  putRequest,
  deleteRequest
}