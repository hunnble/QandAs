'use strict'
let router = require('koa-router')();
let bcrypt = require('bcrypt-nodejs');
let user = require('../models/user');
let config = require('../../configs/config');

router.get('/', function* (next) {
  yield this.render('index', {
    title: 'QandA'
  });
});

router.post('/', function* (next) {
  let body = this.request.body;
  const salt = bcrypt.genSaltSync(config.SALT_ROUND);
  const hash = bcrypt.hashSync(body.password, salt);
  body.password = hash;
  let userExists = yield user.findUser({ 'account': body.account });
  if (userExists) {
    return this.response.body = {
      success: false,
      errMsg: '用户已存在'
    };
  }
  let result = yield user.createUser(body);
  if (result) {
    return this.response.body = {
      success: true
    };
  }
  return this.body = {
    success: false,
    errMsg: '用户创建失败，请重试'
  };
});

module.exports = router;
