// node 后端服务器
// index.js——Express 服务器入口文件
// express基本使用
// express.static静态资源托管
// express.use注册中间件&挂载路径前缀
// express.Router()路由
// express中间件
// express.json 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
// express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
// 在 express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。

const express = require('express')
// const fs = require('fs')
// const path = require('path')
const cors = require('cors')
const app = express()
// 第三方的中间件
app.use(cors()) // 在调用 express.Router() 之前调用 app.use(cors()) 配置中间件,否则无法解决跨域问题
// const bodyParser = require('body-parser') // 用来解析http请求体，就是接受post请求的参数使用的中间件,会把解析好的消息体封装到req.body上面，如果没有消息体解析那么返回的就是一个空对象{}
// app.use(bodyParser.json()) //添加json解析器
// app.use(bodyParser.urlencoded({ extended: false })) // 设置完毕之后，会在req对象上面新增一个req.body的一个对象
// 用了这俩之后，可以使用 req.body 获取post请求携带的参数
app.use(express.json()) // 4.16.0+ 版本中可用 express.json()解析器 如果没有消息体解析那么返回的就是一个空对象{}
app.use(express.urlencoded({ extended: false })) // // 4.16.0+ 版本中可用 express.urlencoded()解析器 设置完毕之后，会在req对象上面新增一个req.body的一个对象 如果没有消息体解析那么返回的就是一个空对象{}
const { expressjwt: expressJWT } = require('express-jwt') //解析JWT
const userApi = require('./api/userApi')// 内涵 express.Router()

// 第三方的中间件
// 注册expressJWT全局中间件 用于解析token，可参考文章：https://www.cnblogs.com/zkqiang/p/11810203.html 。
const SECRET_KEY = 'abcd' // 定义secret私钥(公钥加密算法使用公钥对数据进行加密，只有使用对应的私钥才能解密)
const whiteList = ['/api/user/userNameCheck', '/api/user/register', '/api/user/login', '/api/user/logout'] // path 白名单字段，没有token也放行，可设置一个正则表达式

app.use(expressJWT({
  secret: SECRET_KEY,// 解密用私钥
  algorithms: ["HS256"],// HS256:使用同一个secret进行签名与验证; RS256:使用不同secret进行签名与验证 。
  requestProperty: 'user'// 自定义解析内容返回路径 req.user
}).unless({
  path: whiteList
}))

// 自定义全局中间件 错误中间件在最后 进行捕获错误(错误级别的中间件)
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    /* res.send()向客户端响应处理结果 */
    res.send({ code: 401, msg: '身份验证失败或Token失效', })
  } else {
    res.send({ code: 500, msg: '未知的错误', })
  }
  // next()
})

/* 
  了解中间件的5个使用注意事项
  一定要在路由之前注册中间件
  客户端发送过来的请求，可以连续调用多个中间件进行处理
  执行完中间件的业务代码之后，不要忘记调用 next() 函数
  为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码
  连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象 
*/

// 注册全局路由模块,前面是添加的路由前缀,不需要可去除(路由级别的中间件)
app.use('/api/user', userApi)


// 监听端口
app.listen(3300)
console.log('success listen at port:3300......')

