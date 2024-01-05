/*** 使用 jsonwebtoken 生成token S ***/

const jwt = require('jsonwebtoken'); //生成JWT
const SECRET_KEY = 'abcd'; // 定义secret密钥
const expiresIn = { expiresIn: "24h" } // 设置token过期时间

/* 生成token */
const createToken = function (userInfo) {
  if (userInfo) {
    const { userName, password } = userInfo // 密码不要作为加密信息
    const tokenStr = 'Bearer ' + jwt.sign(
      { userName: userName }, SECRET_KEY, expiresIn // 30=30ms 30h=30小时 token有效期
    )
    return tokenStr
  }
}

/*** 使用 jsonwebtoken 生成token E ***/




module.exports = { createToken }


