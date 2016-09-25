let router = require('koa-router')();
let config = require('../../configs/config');
let jwt = require('jsonwebtoken');
let user = require('../models/user');

function json (obj) {
  return JSON.stringify(obj);
}

router.post('/', function* (next) {
  let body = this.request.body;
  let token = body.token;
  if (!token) {
    return this.response.body = json({
      verify: false
    });
  }
  let verify = jwt.verify(token, config.TOKEN_KEY);
  let userInfo = yield user.findUser({ 'account': verify.account });
  return this.response.body = json({
    verify: userInfo ? true : false,
    user: userInfo ? userInfo : {}
  });
});

module.exports = router;
