import request from '@/utils/request'

// 获取文章评论列表

export const getComment = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: { type, source, offset, limit }
  })
}

// 对评论点赞
/**
 *
 * @param {要取消点赞的评论id或评论回复id} target
 * @returns
 */
export const addlike = target => {
  return request({
    method: 'POST',
    url: 'comment/likings',
    data: {
      target
    }
  })
}

// 取消对评论点赞

export const dellike = target => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}
// 对文章进行评论

export const getArticleComment = ({ target, content, art_id }) => {
  return request({
    method: 'POST',
    url: 'comments',
    data: { target, content, art_id }

  })
}
