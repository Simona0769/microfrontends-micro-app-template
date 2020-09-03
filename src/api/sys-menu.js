import request from '@/utils/request'

export function getMenu(params) {
  return request({
    url: '/micro-app-template/sys/menu/nav',
    method: 'get',
    params,
  })
}