const Mock = require('mockjs')

// 生成订单号
const generateOrderNumber = function () {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const random = Math.floor(Math.random() * 1000);
  return `${year}${month}${day}${hour}${minute}${second}${random}`;
};

// 使用Mock.js模拟订单表数据
const orders = []
const count = 10
for (let i = 0; i < count; i++) {
  orders.push(Mock.mock({
    'orderNo': generateOrderNumber(), // 订单号
    'customerName': '@cname', // 客户姓名
    'orderDate': '@datetime("2023-MM-dd HH:mm:ss")', // 订单日期，指定2023年份
    'orderAmount|100-1000': 1, // 订单金额，范围在100-1000之间
    'orderStatus|1': ['待付款', '待发货', '已发货', '已完成'], // 订单状态，随机选择一个
    'deliveryAddress': '@county(true)', // 配送地址，随机生成一个县级地址
    'isUrgent|1-2': true, // 是否加急
    'express': 0 // 配送快递 默认0:京东
  }))
}
module.exports = [{
  url: '/vue-admin-template/table-example/orders',
  type: 'get',
  response: config => {
    return {
      code: 20000,
      data: {
        total: orders.length,
        data: orders
      }
    }
  }
}, ]
