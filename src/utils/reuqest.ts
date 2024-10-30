// src/utils/request.ts

import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8000/api', 
    timeout: 10000, 
});

request.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        if (token && config.url !== '/login/') {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default request;
