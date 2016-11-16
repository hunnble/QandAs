let router = require('koa-router')();
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt-nodejs');
let user = require('../models/user');
let config = require('../../configs/config');

function json (obj) {
  return JSON.stringify(obj);
}

router.get('/', function* (next) {
  yield this.render('index', {
    title: '登录'
  });
});

router.post('/', function* (next) {
  let body = this.request.body;
  let userFounded = yield user.findUserWithPassword({ 'account': body.account });
  if (!userFounded) {
    return this.response.body = json({
      success: false,
      errMsg: '无此账号'
    });
  }
  let result = bcrypt.compareSync(body.password, userFounded.password);
  if (result) {
    let shouldRememberDays = body.remember ? 10 : 0.25;
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
