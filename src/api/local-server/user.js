import http from "@/utils/local-server/request"

// 获取用户信息
export const getUserInfo = function (token) {
  return http({
    url: '/api/user/getUserInfo',
    method: 'get',
    params: { token }
  })
}
// 注册
export const register = function (data) {
  return http({
    url: '/api/user/register',
    method: 'post',
    data
  })
}
// 注册校验
export const userNameCheck = function (data) {
  return http({
    url: '/api/user/userNameCheck',
    method: 'post',
    data
  })
}
// 登录
export const login = function (data) {
  return http({
    url: '/api/user/login',
    method: 'post',
    data
  })
}
// 登录
export const logout = function () {
  return http({
    url: '/api/user/logout',
    method: 'post',
  })
}