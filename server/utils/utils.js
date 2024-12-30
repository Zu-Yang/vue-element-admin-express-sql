/*** 使用 jsonwebtoken 生成token S ***/

const jwt = require('jsonwebtoken'); //生成JWT
const SECRET_KEY = 'abcd'; // 定义secret公钥,加密用公钥(定义secret私钥(公钥加密算法使用公钥对数据进行加密，只有使用对应的私钥才能解密))
const expiresIn = { expiresIn: "1h" } // 设置token过期时间 30=30ms 30h=30小时 token有效期

/* 生成token */
const createToken = function (userInfo) {
  if (userInfo) {
    const { userName, password } = userInfo // 密码不要作为加密信息
    const tokenStr = 'Bearer ' + jwt.sign(
      { userName: userName }, SECRET_KEY, expiresIn 
    )
    return tokenStr
  }
}

/*** 使用 jsonwebtoken 生成token E ***/




module.exports = { createToken }


