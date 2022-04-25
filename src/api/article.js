import request from "@/utils/request"

/**
 * 
 * `文章相关的 请求接口
 * 
 */


// 获取文章列表
export const getArticles = (params = {}) => {
    return request({
        method: "GET",
        url: "/mp/v1_0/articles",
        params
    })
}



// 获取文章频道列表

export const getArticleChannels = () => {
    return request({
        method: "GET",
        url: "/mp/v1_0/channels",
    })
}


// 根据文章 ID 删除对应的 文章

export const deleteArticle = (articleId) => {
    return request({
        method: "DELETE",
        url: "/mp/v1_0/articles/" + articleId,
    })
}