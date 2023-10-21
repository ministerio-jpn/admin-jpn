import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://191.252.3.40:8080'
})