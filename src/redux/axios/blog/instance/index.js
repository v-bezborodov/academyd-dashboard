import * as axios from 'axios'
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}
if (localStorage.accessToken) {
    headers.Authorization = `Bearer ${localStorage.accessToken}`
}


const blogInstance = axios.create({
    baseURL: 'https://coffee.slawek.dev/',
    headers,
})

export default blogInstance