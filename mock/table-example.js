const Mock = require('mockjs')
const {
  parseTime
} = require("../src/utils/index");

// 生成随机订单号
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
const count = 100

for (let i = 0; i < count; i++) {
  orders.push(Mock.mock({
    'orderNo': generateOrderNumber(), // 订单号
    'customerName': '@cname', // 客户姓名
    'orderDate': '@datetime("2023-MM-dd HH:mm:ss")', // 订单日期，指定yyyy:2023年
    'orderAmount|100-1000': 1, // 订单金额，范围在100-1000之间
    'orderStatus|1': ['待付款', '待发货', '已发货', '已签收'], // 订单状态，随机选择一个
    'deliveryAddress': '@county(true)', // 配送地址，随机生成一个县级地址
    'isUrgent|1-2': false, // 是否加急
    'express|0-2': 1 // 配送快递 默认0:京东
  }))
}

// 最后修改时间默认等于下单时间
orders.map(item => {
  item['orderLastDate'] = item.orderDate;
  return item
})

module.exports = [{
    url: '/vue-admin-template/table-example/orders',
    type: 'get',
    response: config => {
      /* 获取传递参数 */
      const {
        orderNo,
        timestamp,
        isUrgent,
        express,
        keywords,
        page = 1,
        limit = 10
      } = config.query // config.query 获取get请求携带的参数

      /* 筛选逻辑 */
      const starTime = timestamp && parseInt(timestamp[0]) // 字符串转换为整数
      const endTime = timestamp && parseInt(timestamp[1]) // 字符串转换为整数

      const filterOrders = orders.filter(item => {
        var orderTimeStamp = +new Date(item.orderDate) // 订单时间转化为时间戳
        if (orderNo && !item.orderNo.includes(orderNo)) return false // 订单号模糊筛选
        if (keywords && !item.deliveryAddress.includes(keywords) && !item.customerName.includes(keywords)) return false // 地址,名称模糊筛选
        if (express && !express.includes(String(item.express))) return false // 快递配送筛选
        if (isUrgent && !isUrgent.includes(String(item.isUrgent))) return false // 是否加急筛选
        if (timestamp && starTime > orderTimeStamp || orderTimeStamp > endTime) return false // 订单时间筛选
        return true
      })

      /* 分页逻辑 */
      const pageList = filterOrders.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: filterOrders.length,
          data: pageList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/table-example/update',
    type: 'post',
    response: config => {
      let data = config.body
      const index = orders.findIndex(item => item.orderNo === data.orderNo)
      data.orderLastDate = parseTime(new Date)
      orders.splice(index, 1, data)

      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-admin-template/table-example/delete',
    type: 'post',
    response: config => {
      const {
        orderNo
      } = config.body // config.body 获取post请求携带的参数
      const index = orders.findIndex(item => item.orderNo === orderNo)
      orders.splice(index, 1)

      return {
        code: 20000,
        data: 'success'
      }
    }
  },
]
