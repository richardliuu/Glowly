import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000, 
    headers:{
        "Authorization": `Token ${localStorage.getItem("authToken")}`, 
        "Content-Type":"application/json",
        accept: "application/json",
    }
})

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken')
        if(token){
            config.headers.Authorization = `Token ${token}`
        }
        else{
            config.headers.Authorization = ``
        }
        return config;
    }
)

AxiosInstance.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
        if(error.response && error.response.status === 401){
            localStorage.removeItem('authToken')
        }
        return Promise.reject(error); 

    }
)

export default AxiosInstance;