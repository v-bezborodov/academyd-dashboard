import * as axios from 'axios'
import requestInterceptor from "../../_interceptor/requestInterceptor";
import responseInterceptor from "../../_interceptor/responseInterceptor";

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

const eventInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers,
})

eventInstance.interceptors.request.use(requestInterceptor, error => Promise.reject(error))

eventInstance.interceptors.response.use(response => response, responseInterceptor)

export default eventInstance
