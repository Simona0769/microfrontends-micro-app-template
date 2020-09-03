import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/micro-app-template/table/list',
    method: 'get',
    params
  })
}
