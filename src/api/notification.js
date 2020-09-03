import request from '@/utils/request'

export function getNotification(params) {
  return new Promise((then, reject) => {
    setTimeout(() => {
      then({
        records: [{
          id: '1',
          title: '标题'
        }]
      })
    }, 300)
  })
  // return request({
  //   url: '/notification',
  //   method: 'get',
  //   params
  // }).then(res => {
  //   return []
  // })
}
