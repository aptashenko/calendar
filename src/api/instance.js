import axios from "axios";

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`
}

const baseRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        post: headers,
        get: headers,
        patch: headers,
        delete: headers
    }
})

baseRequest.interceptors.request.use(config => config, error => Promise.reject(error))
baseRequest.interceptors.response.use(config => config, error => Promise.reject(error))

export { baseRequest }
