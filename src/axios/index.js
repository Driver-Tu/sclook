import axios from 'axios';

const token = localStorage.getItem('token');

const serviceAxios = axios.create({
    baseURL: "http://192.168.0.132:8080", // 基础请求地址
    timeout: 10000, // 请求超时设置
    headers: {
        "Content-Type": "application/json",
        "token": token // 将获取到的token值作为默认的请求头中的token
    }
});

serviceAxios.interceptors.request.use(
    config => {
        const newToken = localStorage.getItem('token');
        if (token !== newToken) {
            config.headers['token'] = newToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default serviceAxios;
