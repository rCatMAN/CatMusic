import axios from "axios"

const request = axios.create({
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin-Type": '*'
    },
    baseURL: 'https://service-miegmo5o-1314215170.gz.apigw.tencentcs.com/release/',
    timeout: 80000,
    withCredentials: true,
    // headers: {
    // 设置后端需要的传参类型
    // 'Content-Type': 'application/json',
    // 'token': x-auth-token',//一开始就要token
    // 'X-Requested-With': 'XMLHttpRequest',
    // },
})
// request拦截器
request.interceptors.request.use(
    config => {
        // 如果你要去localStor获取token
        // let token = localStorage.getItem("x-auth-token");
        // if (token) {
        //     config.headers = {"x-auth-token": token}
        // }
        return config
    },
    error => {
        // 对请求错误做些什么
        Promise.reject(error)
    }
)
// response 拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data
    },
    error => {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)
export default request