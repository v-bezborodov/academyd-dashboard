import * as axios from 'axios'
import requestInterceptor from "../../_interceptor/requestInterceptor";
import responseInterceptor from "../../_interceptor/responseInterceptor";

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

if (localStorage.accessToken) {
  headers.Authorization = `Bearer ${localStorage.accessToken}`
}

const registrationInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers,
})

registrationInstance.interceptors.request.use(requestInterceptor, error => Promise.reject(error))

registrationInstance.interceptors.response.use(response => response, responseInterceptor)

export default registrationInstance

