import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

request.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axios(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                return Promise.reject(error);
            }

            try {
                const response = await axios.post('http://localhost:8000/api/token/refresh/', {
                    refresh: refreshToken,
                });

                const { access } = response.data;
                localStorage.setItem('accessToken', access);
                processQueue(null, access);

                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return axios(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default request;
