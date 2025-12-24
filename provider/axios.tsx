import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import Cookies from 'js-cookie'

const AxiosClient = axios.create({
  baseURL: '/api',
})
AxiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get('token')
    const headers = new AxiosHeaders({
      ...config.headers,
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    })
    
    return {
      ...config,
      headers,
      withCredentials: false,
    }
  },
  (err: AxiosError) => Promise.reject(err)
)

AxiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response
  },
  async (error: AxiosError) => {
    if (!error.response) {
      const errorMessage = 'Sorry, something went wrong on Our Server'
      
      return Promise.reject({
        response: {
          status: 500,
          data: {
            error: {
              status: 500,
              message: errorMessage,
            },
          },
        },
      } as AxiosError)
    }
    
    // Unauthorized
    if (error.response.status === 401) {
      const token = Cookies.get('token')
      if (token) {
        Cookies.remove('token')
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)

export default AxiosClient
