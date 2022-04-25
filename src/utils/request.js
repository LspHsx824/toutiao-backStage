import axios from "axios";

import JSONbigint from "json-bigint"

import store from "@/store/index"

const request = axios.create({
  baseURL: "http://api-toutiao-web.itheima.net",
  transformResponse: [function (data) {

    try {
      return JSONbigint.parse(data) // 解决大数字， 精度丢失
    } catch (err) {
      return data //默认是 json.parse(data)
    }
  }]

});

request.interceptors.request.use(
  function (config) {
    // config 请求配置 对象
    if (store.state.userInfo) {
      config.headers.Authorization = `Bearer ${store.state.userInfo.token}`
    }
    return config
  },
  function (error) {
    // console.log(error);
    return Promise.reject(error);
  }
);

export default request;