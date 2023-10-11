import request from '@/utils/request'

export function getOrders(params) {
  return request({
    url: '/vue-admin-template/table-example/orders',
    method: 'get',
    params
  })
}
export function updateOrders(data) {
  return request({
    url: '/vue-admin-template/table-example/update',
    method: 'post',
    data
  })
}
export function deleteOrders(data) {
  return request({
    url: '/vue-admin-template/table-example/delete',
    method: 'post',
    data
  })
}
