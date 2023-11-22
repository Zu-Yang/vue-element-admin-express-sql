/* 使用JSEncrypt加密解密  */
import JsEncrypt from "jsencrypt"
// 公钥
const PUBLICK_KEY = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKlZ9oINLHCHZmOArxUaxOPY8qdD9JxM
dMY+5KGB+Q3nfJzus2ZXmOAANMPQafELY9kNz5bK3jgL1nUQ3w/vnssCAwEAAQ==
-----END PUBLIC KEY-----`
// 私钥
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAqVn2gg0scIdmY4Cv
FRrE49jyp0P0nEx0xj7koYH5Ded8nO6zZleY4AA0w9Bp8Qtj2Q3PlsreOAvWdRDf
D++eywIDAQABAkEAj25EW61wn/XtgASzRLqhWyCZk5T4jZArruQBm9CK8XxmO314
BOjQYyuM16FUGhgoFjqFayY7154Nz4Zj8OctYQIhANzk34Xj9l4ZoGFfxS/MEns7
mVbaGTgwkoFBv8brTZ2ZAiEAxEQQ5U88oY9/6rHp+/dwuKgRuldgallgWNY03IVc
tgMCIQDSHJpI/xefVnzpYnFsD48czQoERRxsCDey31mN2tBPMQIhAIL6Saw+bOAE
vAEMKnKUdw1EXFBW72kJrFqc2ToxZeWxAiA6NAI4jQ+x8VniqSLZH3blhUfwUFzw
Y3jxqCUXwHlk4g==
-----END PRIVATE KEY-----`

/**
 * 对数据进行 RSA 加密，加密失败时会返回 false。
 *
 * JSEncrypt 只能加密字符串数据，因此使用 JSON.stringify 对要加密的数据进行序列化
 *
 * 但此时需要注意一些 JSON.stringify 的问题
 *
 * 比如：JSON.stringify(undefined) => undefined // 这不是一个字符串
 * 比如：JSON.stringify({ prop: undefined }) => '{}'
 * 比如：JSON.stringify(NaN) => 'null'
 *
 * @param {string | number | Object | Array} plaintext 明文
 * @param {string} publicKey 公钥，可选
 * @returns {string | false} 密文
 */
export function encryptByRSA(plaintext, publicKey = PUBLICK_KEY) {
  if (plaintext) {
    if (publicKey) {
      const encryptor = new JsEncrypt()
      encryptor.setPublicKey(publicKey) // 设置公钥
      return encryptor.encrypt(JSON.stringify(plaintext)) // JSEncrypt 只能加密字符串数据，因此使用 JSON.stringify 对要加密的数据进行序列化
    } else {
      throw '无公钥'
    }
  } else {
    throw '加密请传入明文'
  }
}

/**
 * 对密文进行 RSA 解密，秘钥不对会返回 false，数据不是加密后的密文会返回 null。
 *
 * 会使用 JSON.parse 对解密后数据进行反序列化
 *
 * @param {string} secretText 待解密的字符串
 * @param {string} privateKey 私钥
 * @returns {any} 解密后的数据
 */
export const decryptByRSA = (secretText, privateKey = PRIVATE_KEY) => {
  const decrypt = new JsEncrypt()

  decrypt.setPrivateKey(privateKey);

  return JSON.parse(decrypt.decrypt(secretText));
};

// 参考文章 https://blog.csdn.net/dark_cy/article/details/133603332