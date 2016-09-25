let router = require('koa-router')();
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let user = require('../models/user');
let config = require('../../configs/config');

function json (obj) {
  return JSON.stringify(obj);
}

router.get('/', function* (next) {
  yield this.render('index', {
    title: '陆壹'
  });
});

router.post('/', function* (next) {
  let body = this.request.body;
  let userFounded = yield user.findUser({ 'account': body.account });
  if (!userFounded) {
    return this.response.body = json({
      success: false,
      errMsg: '无此账号'
    });
  }
  let result = bcrypt.compareSync(body.password, userFounded.password);
  if (result) {
    // 根据用户是否点选checkbox，保存token6小时或10天
    let shouldRememberDays = body.remember ? 0.25 : 10;
    let token = jwt.sign({
      account: body.account,
      exp: Math.floor((new Date().getTime()) / 1000) + 60 * 60 * 24 * shouldRememberDays
    }, config.TOKEN_KEY);
    return this.response.body = json({
      success: true,
      token: token
    });
  }
  return this.response.body = json({
    success: false,
    errMsg: '密码错误'
  });
});

module.exports = router;
