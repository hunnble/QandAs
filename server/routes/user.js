'use strict'
let router = require('koa-router')();
let paper = require('../models/paper');
let config = require('../../configs/config');
let jwt = require('jsonwebtoken');

router.post('/papers', function* (next) {
  let body = this.request.body;
  let account = jwt.verify(body.token, config.TOKEN_KEY).account;
  if (!account) {
    return this.response.body = {
      success: false,
      errMsg: '请先登录'
    };
  }
  let publishedPapers = yield paper.findPapers({ 'creator': account });
  let answeredPapers = yield paper.findPapers({  });
  return this.response.body = {
    publishedPapers,
    answeredPapers
  }
});

module.exports = router;
