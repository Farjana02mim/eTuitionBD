import { useEffect } from "react"
import axios from "axios"
import useAuth from "./useAuth"

const useAxiosSecure = () => {
  const { user, logOut } = useAuth()

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5000",
  })

  // Request interceptor: attach JWT
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor: handle unauthorized
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        await logOut()
        localStorage.removeItem("access-token")
      }
      return Promise.reject(error)
    }
  )

  return axiosSecure
}

export default useAxiosSecure
