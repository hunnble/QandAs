let router = require('koa-router')();
let user = require('../models/user');
let bcrypt = require('bcrypt-nodejs');
let jwt = require('jsonwebtoken');
let config = require('../../configs/config');

router.get('/', function* (next) {
  yield this.render('index', {
    title: '个人信息'
  });
});

router.put('/', function* (next) {
  let body = this.request.body;
  let account = jwt.verify(body.token, config.TOKEN_KEY).account;
  if (!account) {
    return this.response.body = {
      success: false,
      errMsg: '请先登录'
    };
  }
  delete body.token;
  let curUser = yield user.findUser({ 'account': account });
  if (!curUser) {
    return this.response.body = {
      success: false,
      errMsg: '更改失败,请重新登录'
    };
  }
  if (isEmpty(body)) {
    return this.response.body = {
      success: false,
      errMsg: '表单填写不全'
    };
  }
  if (body.curPassword && body.password && body.password2) {
    const userWithPassword = yield user.findUserWithPassword({ 'account': account });
    const oldPassword = userWithPassword.password;
    const changePasswordPermission = bcrypt.compareSync(body.curPassword, oldPassword);
    if (!changePasswordPermission) {
      return this.response.body = {
        success: false,
        errMsg: '请输入正确的密码'
      };
    }
    const salt = bcrypt.genSaltSync(config.SALT_ROUND);
    const hash = bcrypt.hashSync(body.password, salt);
    body.password = hash;
    delete body.curPassword;
    delete body.password2;
  } else if (body.curPassword || body.password || body.password2) {
    return this.response.body = {
      success: false,
      errMsg: '表单填写不全'
    };
  }
  let result = yield user.updateUser({
    'account': account
  }, body);
  if (!result) {
    return this.response.body = {
      success: false,
      errMsg: '更改失败,请重试'
    };
  }
  return this.response.body = {
    success: true,
    errMsg: '更改成功'
  };
});

function isEmpty(obj) {
  for(var name in obj) {
    if(obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
}

module.exports = router;
