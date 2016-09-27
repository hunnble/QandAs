let router = require('koa-router')();
let user = require('../models/user');
let bcrypt = require('bcrypt');
let config = require('../../configs/config');

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
      errMsg: '更改信息失败, 请重新登录并重试'
    };
  }
  if (body.password) {
    const userWithPassword = yield user.findUserWithPassword({ 'account': account });
    const oldPassword = userWithPassword.password;
    const changePasswordPermission = bcrypt.compareSync(body.curPassword, oldPassword);
    if (!changePasswordPermission) {
      return this.response.body = {
        success: false,
        errMsg: '密码错误, 无法更换新密码'
      };
    }
    const hash = bcrypt.hashSync(body.password, config.SALT_ROUND);
    body.password = hash;
    delete body.curPassword;
    delete body.password2;
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
    success: true,
    errMsg: '更改成功'
  };
});

module.exports = router;
