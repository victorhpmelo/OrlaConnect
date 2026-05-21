import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse
} from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Interceptor para adicionar token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// Interceptor para tratar erro 401
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api