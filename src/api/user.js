import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/micro-app-template/user/login',
    method: 'post',
    data,
    loadingText: '正在登录中...'
  })
}

export function getInfo(token) {
  return request({
    url: '/micro-app-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/micro-app-template/user/logout',
    method: 'post'
  })
}
