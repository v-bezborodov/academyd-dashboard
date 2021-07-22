import * as axios from 'axios'
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}
if (localStorage.accessToken) {
    headers.Authorization = `Bearer ${localStorage.accessToken}`
}


const eventInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers,
})

export default eventInstance
