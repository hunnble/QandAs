var router = require('koa-router')();
var user = require('../models/user');

router.post('/', function* (next) {
  let body = this.request.body;
  var result = yield user.updateUser({ settings: body });
  if (result) {
    return this.response.body = {
      success: true
    };
  }
  return this.response.body = {
    success: false,
    errMsg: '设置失败，请重试'
  };
});

module.exports = router;
