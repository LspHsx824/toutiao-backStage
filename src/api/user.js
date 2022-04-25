import request from "@/utils/request"

/**
 * 
 * `用户相关的 请求接口
 * 
 */


// 用户登录

export const login = data => {
    return request({
        method: "POST",
        url: "/mp/v1_0/authorizations",
        data
    })
}

// 获取用户信息
export  function getUserProfile () {
    return request({
      method: 'GET',
      url: '/mp/v1_0/user/profile'
    })
  }