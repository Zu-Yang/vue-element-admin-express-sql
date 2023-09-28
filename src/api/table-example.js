import request from '@/utils/request'

export function getOrders(params) {
  return request({
    url: '/vue-admin-template/table-example/orders',
    method: 'get',
    params
  })
}