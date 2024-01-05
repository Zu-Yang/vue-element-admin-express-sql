//api路由
//userApi.js —— 测试用 API 示例

const express = require('express');
const { insert, del, update, query } = require('../mySql/sqlMap');
const models = require('../mySql/db');
const router = express.Router();
const mysql = require('mysql');
const conn = mysql.createConnection(models.mysql);// 连接数据库
conn.connect()
const { createToken } = require("../utils/utils"); // 工具函数
const { decryptRSA } = require("../utils/node-rsa"); // 工具函数

/* 获取用户信息 */
router.get('/getUserInfo', (req, res) => {
  // const { token } = req.query // 用户传递的token
  const { userName } = req.user // 获取已经被解析的token内容
  if (userName) {
    const sqlMap = {
      colName: '*', // 列名称(*代表全部字段)
      tbName: 'user', // 表名
      where: `userName = '${userName}'` // 根据用户名筛选,判断是否存在用户,注意:值需要加 '' 号 ,否则会报错找不到字段的错误
    }
    conn.query(query(sqlMap.colName, sqlMap.tbName, sqlMap.where), function (err, result) {
      if (err) {
        return res.send({ msg: "服务器遇到错误，无法完成用户信息请求", code: 500, err: err })
      }
      if (result) {
        if (typeof result === 'undefined') {
          return res.send({ code: 0, msg: '获取用户信息失败' });
        }
        return res.send({ code: 200, msg: '获取用户信息成功', data: result[0] })
      }
    })
  } else {
    return res.send({ code: 401, msg: '请求参数有误，缺少用户名信息' })
  }
})

/* 注册 */
router.post('/register', (req, res) => {
  const { userName, password } = req.body //用req.body获取post数据，需要装body-parser中间件
  if (userName && password) {
    const sqlMap = {
      tbName: 'user(userName,password,roles,intro,avatar)', // 表名(插入的字段)
      values: '(?,?,?,?,?)' // 字段值(修改多少个字段就有多少个?)
    }
    const roles = JSON.stringify(['editor']) // 默认角色
    const intro = '普通用户' // 介绍
    const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' // 头像
    const parmas = [userName, password, roles, intro, avatar]
    conn.query(insert(sqlMap.tbName, sqlMap.values), parmas, function (err, result) {
      if (err) {
        return res.send({ msg: "服务器遇到错误，无法完成注册请求", code: 500, err: err })
      }
      if (result) {
        if (typeof result === 'undefined') {
          return res.send({ code: 0, msg: '注册失败' });
        }
        return res.send({ code: 200, msg: "注册成功" });
      }
    })
  } else {
    return res.send({ code: 401, msg: '请求参数有误，缺少用户信息' })
  }
});

/* 注册校验 */
router.post('/userNameCheck', (req, res) => {
  const { userName } = req.body //用req.body获取post数据，需要装body-parser中间件
  if (userName) {
    const sqlMap = {
      colName: 'userName', // 列名称(*代表全部字段)
      tbName: 'user', // 表名
      where: `userName = '${userName}'` // 根据用户名筛选,判断是否存在用户,注意:值需要加 '' 号 ,否则会报错找不到字段的错误
    }
    conn.query(query(sqlMap.colName, sqlMap.tbName, sqlMap.where), function (err, result) {
      if (err) {
        return res.send({ msg: "服务器遇到错误，无法完成校验请求", code: 500, err: err })
      }
      /* 注册校验 */
      if (result) {
        if (result.length === 0) {
          /* 数据库没找到该用户名,则可注册 */
          return res.send({ msg: "可注册", code: 200 })
        }
        return res.send({ msg: "不可注册,用户已存在", code: 0 })
      }
    })
  } else {
    res.send({ msg: "请求参数有误，缺少用户名", code: 401 })
  }
});

/* 登录 */
router.post('/login', (req, res) => {
  const { userName, password } = req.body //用req.body获取post数据，需要装body-parser中间件
  if (userName && password) {
    const sqlMap = {
      colName: '*', // 列名称(*代表全部字段)
      tbName: 'user', // 表名
      where: `userName='${userName}'` // 无筛选勿加此条件，否则报错拿不到数据
    }
    conn.query(query(sqlMap.colName, sqlMap.tbName, sqlMap.where), function (err, result) {
      if (err) {
        return res.send({ msg: "服务器遇到错误，无法完成登录请求", code: 500, err: err })
      }
      if (result) {
        if (result.length === 0) {
          return res.send({ code: 0, msg: "用户名错误" })
        }
        const forePasswordDecrypt = decryptRSA(password)
        const sqlPasswordDecrypt = decryptRSA(result[0].password)

        if (forePasswordDecrypt == sqlPasswordDecrypt) {
          return res.send({ code: 200, token: createToken(req.body), msg: "登录成功" })
        } else {
          return res.send({ code: 0, msg: "密码错误" })
        }
      }
    })
  } else {
    return res.send({ msg: "请求参数有误，缺少用户信息", code: 401 })
  }
})
/* 注销 */
router.post('/logout', (req, res) => {
  return res.send({ code: 200, msg: "注销" })
})
module.exports = router;

