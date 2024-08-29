import axios from 'axios';

const serviceAxios = axios.create({
    baseURL: "http://192.168.0.132:7777", // 基础请求地址
    timeout: 10000, // 请求超时设置
    headers: {
        'Content-Type': 'application/json'
    }
});

// 请求拦截器
serviceAxios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Authorization-Token');
        if (token) {
            config.headers['Authorization-Token'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
serviceAxios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // 处理请求失败的情况
        return Promise.reject(error);
    }

);

export default serviceAxios;
