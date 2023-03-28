import axios from 'axios'

const api_axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

// Todo: configurar interceptores
api_axios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  }

  return config
})

export { api_axios }
