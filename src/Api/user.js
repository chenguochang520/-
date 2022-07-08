import request from '@/utils/request'
// import store from '@/store'
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
    url: 'user'
    // headers: {
    //   Authorization: 'Bearer ' + store.state.users.token
    // }
  })
}

// 获取用户的个人信息

export const getUserProfile = (profile) => {
  return request({
    url: 'user/profile'
  })
}

/**
  *
  * @param {更改用户信息} profile
  * @returns
  */
export const updateUserProfile = profile => {
  return request({
    method: 'PATCH',
    url: 'user/profile',
    data: profile
  })
}

/**
 *
 * @param {修改头像} data
 * @returns
 */
export const updateUserAvatar = data => {
  return request({
    method: 'PATCH',
    url: 'user/photo',
    data
  })
}
