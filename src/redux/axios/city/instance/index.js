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

const cityInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers,
})

cityInstance.interceptors.request.use(requestInterceptor, error => Promise.reject(error))

cityInstance.interceptors.response.use(response => response, responseInterceptor)


export default cityInstance
