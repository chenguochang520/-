import request from '@/utils/request'

export const getSuggestList = q => {
  return request({
    url: 'suggestion',
    params: { q }
  })
}

// 获取搜索结果

// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: { page, per_page, q }
  })
}
