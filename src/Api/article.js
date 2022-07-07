import request from '@/utils/request'

// 获取文章信息
export const getArticle = article_id => {
  return request({
    url: `/articles/${article_id}`

  })
}
// 添加用户关户关注
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: { target }
  })
}

// 取消用户关注

export const deluser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`

  })
}
// 添加收藏
export const addcollected = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: { target }
  })
}

// 删除收藏
export const delcollected = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}
