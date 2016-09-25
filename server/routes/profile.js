let router = require('koa-router')();
let user = require('../models/user');

router.get('/', function* (next) {
  yield this.render('index', {
    title: '用户资料'
  });
});

router.put('/', function* (next) {
  let body = this.request.body;
  let account = body.account;
  delete body.account;
  let curUser = yield user.findUser({ 'account': account });
  if (!curUser) {
    return this.response.body = {
      success: false,
      errMsg: '更改信息失败，请重新登录并重试'
    };
  }
  let result = yield user.updateUser({
    'account': account
  }, body);
  if (!result) {
    return this.response.body = {
      success: false,
      errMsg: '更改信息失败'
    };
  }
  return this.response.body = {
    success: true
  };
});

module.exports = router;
