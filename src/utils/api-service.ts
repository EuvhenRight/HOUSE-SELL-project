import axios, { AxiosRequestConfig, Method } from 'axios'
//Add types
interface ApiServiceResponse<T> {
  data: T
}

const createHeaders = () => ({
  'X-Api-Key': import.meta.env.VITE_API_KEY
})

const createConfig = (
  url: string,
  method: Method,
  body?: Record<string, any>
): AxiosRequestConfig => {
  const headers = createHeaders()
  const config: AxiosRequestConfig = {
    method,
    headers,
    url,
    data: body
  }
  return config
}

export const apiService = async <T>(
  url: string,
  method: Method,
  body?: Record<string, any>
): Promise<ApiServiceResponse<T>> => {
  try {
    const response = await axios(createConfig(url, method, body))
    return { data: response.data }
  } catch (error) {
    console.error('Error in API request:', error)
    throw error
  }
}
