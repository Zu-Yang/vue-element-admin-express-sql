const NodeRSA = require("node-rsa"); // node-rsa 解密

/* 公钥 */
const PUBLICK_KEY = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKlZ9oINLHCHZmOArxUaxOPY8qdD9JxM
dMY+5KGB+Q3nfJzus2ZXmOAANMPQafELY9kNz5bK3jgL1nUQ3w/vnssCAwEAAQ==
-----END PUBLIC KEY-----`
/* 私钥 */
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
 * 生成 RSA 公私钥对
 * @return {Object} { publicKey, privateKey }
 */
const generateRSAKeyPair = () => {
  const key = new NodeRSA({ b: 512 }); // 指定密钥长度

  key.setOptions({ encryptionScheme: 'pkcs1' }); // 指定加密格式

  const publicKey = key.exportKey('pkcs8-public-pem'); //制定输出格式
  const privateKey = key.exportKey('pkcs8-private-pem');

  return { publicKey, privateKey };
};
/**
* 使用公钥进行 RSA 加密，加密出错会抛出异常
* @param {any} data 需要加密的数据，会使用 JSON.stringify 序列化
* @param {string} publicKey
* @return {string} 加密后的密文
*/
const encryptRSA = (data, publicKey = PUBLICK_KEY) => {
  const encrypt = new NodeRSA(publicKey, 'pkcs8-public-pem');
  encrypt.setOptions({ encryptionScheme: 'pkcs1' });

  return encrypt.encrypt(JSON.stringify(data), 'base64');
};

/**
* 使用私钥进行 RSA 解密，如果解密失败，则抛出异常
* @param {string} secretText 密文
* @param {string} privateKey 私钥
* @return {String} 解密后的明文，会使用 JSON.parse 反序列化
*/
const decryptRSA = (secretText, privateKey = PRIVATE_KEY) => {
  const decrypt = new NodeRSA(privateKey, 'pkcs8-private-pem');

  // jsencrypt 自身使用的是 pkcs1 加密方案，所以这里设置为 pkcs1
  decrypt.setOptions({ encryptionScheme: 'pkcs1' });

  return JSON.parse(decrypt.decrypt(secretText, 'utf8'));
};

module.exports = { generateRSAKeyPair, encryptRSA, decryptRSA }

// 参考文章 https://blog.csdn.net/dark_cy/article/details/133603332