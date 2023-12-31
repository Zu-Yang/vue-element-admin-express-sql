# vue-element-admin-express-sql

> this is a vue+element+admin+express+sql project
> 当前仅使用 express+sql 实现了登录注册功能 其余数据还是通过 mockjs 模拟获取

## 模板使用 - vue-element-admin

[模板仓库](https://github.com/PanJiaChen/vue-element-admin)

[模板线上地址](http://panjiachen.github.io/vue-admin-template)

[模板国内访问](https://panjiachen.gitee.io/vue-admin-template)

[模板中文文档](https://mvvcc.com/vue-element-admin-site/zh/)

## Build Setup

```bash
# 克隆项目
git clone https://github.com/Zu-Yang/vue-element-admin-express-sql.git

# 进入项目目录
cd vue-element-admin-express-sql

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## Server

### 下载 navicat 创建并且配置好数据库
![数据库截图](./server/mySql/img-sql.png)

### 找到 server/mySql/db.js 目录，修改数据库配置

```bash
# 全局安装nodemon
npm install nodemon -g

# 进入本地服务器目录
cd vue-element-admin-express-sql/server

# 终端运行代码
nodemon index.js
```

提示 success listen at port:3000......


## Build

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```