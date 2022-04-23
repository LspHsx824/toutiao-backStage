import axios from "axios"

const request = axios.create({
    baseURL:"http://api-toutiao-web.itheima.net"
})

export default request