const bcryptjs = require('bcryptjs')
// import bcryptjs from "bcryptjs";

/**
 * 不可逆加密 ，一旦加密不可解密，只可比对
 * @param {String} plaintext 明文(加密内容)
 * @param {Number} salt 要生成或使用的盐长度，默认为10
 * @returns {[String|Boolear]} 返回值
 */
const encryp_bcryptjs = (plaintext, salt = 10) => {
  if (!plaintext) {
    throw '加密请传入明文'
  }
  return bcryptjs.hashSync(plaintext, salt)
}

/**
 * 不可逆加密 ，一旦加密不可解密，只可比对
 * @param {String} plaintext 明文(加密内容)
 * @param {String} ciphertext 加密的哈希(密文)
 * @returns {[String|Boolear]} 返回值
 */
const decrypt_bcryptjs = (plaintext, plaintext) => {
  if (!plaintext || !plaintext) {
    throw '解密参数错误或缺少参数'
  }
  return bcryptjs.compareSync(ciphertext, plaintext)
}

export default { encryp_bcryptjs, decrypt_bcryptjs }