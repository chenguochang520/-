import request from '@/utils/request'
import store from '@/store'
// 获取验证码
export const getSms = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile, code
    }

  })
}

export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {
      Authorization: 'Bearer ' + store.state.users.token
    }
  })
}
