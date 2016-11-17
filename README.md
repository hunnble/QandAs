# QandAs
>React+koa+MongoDB开发的微型问卷调查平台

在线地址: [点击这里](https://reactqanda.herokuapp.com/)
测试公用账号: `qanda`
密码: `qanda123`

### 基础功能:
* 用户注册、登录、基本信息设置、密码修改
* 已登录用户对问卷的管理,包括创建、编辑、发布、删除、数据统计
* 在线使用关键词搜索问卷、答卷并提交
* 设置(全屏)

### 下载到本地使用
```
git clone https://github.com/hunnble/QandAs.git
cd QandAs
npm install
webpack
node server/app.js
```

### 依赖环境
`node.js ^6.0`、`webpack`、`MongoDB`

数据库配置项在configs目录下,请自行配置并连接MongoDB。
数据库使用到的collections:
* papers
* users

### TODO
* [ ] 增加题目类型
* [ ] 增加是否必答选项
* [ ] 问卷回答情况统计改用图表做可视化(待定)
* [ ] 异步请求时的加载效果
* [ ] 配色及样式修改
* [ ] 移动端兼容性优化
