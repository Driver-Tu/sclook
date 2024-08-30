import axios from 'axios';
const serviceAxios = axios.create({
    baseURL: "", // 基础请求地址
    timeout: 10000, // 请求超时设置
    headers: {
        "Content-Type": "application/json",
        "Authorization-Token": localStorage.getItem('Authorization-Token')
    }
});

// 请求拦截器
serviceAxios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Authorization-Token');
        if (token!=null) {
            config.headers['Authorization-Token'] = token;
        }
        return config;
    },
    error => {
        return error;
    }
);


export default serviceAxios;
