import * as axios from 'axios'
import requestInterceptor from "../../_interceptor/requestInterceptor";
import responseInterceptor from "../../_interceptor/responseInterceptor";

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

const calendarInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers,
})

calendarInstance.interceptors.request.use(requestInterceptor, error => Promise.reject(error))

calendarInstance.interceptors.response.use(response => response, responseInterceptor)

export default calendarInstance
