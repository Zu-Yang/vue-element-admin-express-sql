// db.js——用来添加 mysql 配置 根据mysql的IP，端口，用户名，密码，数据库名称自行修改
module.exports = {
  mysql: {
    host: "localhost",
    user: "root", // 用户名
    password: "root1234", // 数据库密码
    database: "vue-admin-template", // 数据库名字
    port: 3306, // 端口号
  },
};
