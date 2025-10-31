import axios from 'axios'

const baseURL = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL as string) || 'http://localhost:8080'

const api = axios.create({
  baseURL,
})

export default api
