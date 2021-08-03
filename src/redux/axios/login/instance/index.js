import * as axios from 'axios'
import requestInterceptor from "../../_interceptor/requestInterceptor";
import responseInterceptor from "../../_interceptor/responseInterceptor";


const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

const customerInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

customerInstance.interceptors.request.use(requestInterceptor, error => Promise.reject(error))

customerInstance.interceptors.response.use(response => response, responseInterceptor)

export default customerInstance
 