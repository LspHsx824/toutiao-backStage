import request from "@/utils/request"

/**
 * 
 * `用户相关的 请求接口
 * 
 * 
 * 
 */


export const login = data => {
    return request({
        method: "POST",
        url: "/mp/v1_0/authorizations",
        // data: {
        //     mobile: form.name,
        //     code: form.code,
        // },
        data
    })
}