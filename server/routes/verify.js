'use strict'
let router = require('koa-router')();
let config = require('../../configs/config');
let jwt = require('jsonwebtoken');
let user = require('../models/user');
let paper = require('../models/paper');

function json (obj) {
  return JSON.stringify(obj);
}

router.post('/', function* (next) {
  let body = this.request.body;
  let token = body.token;
  let publishedPapers = [];
  let answeredPapers = [];
  if (!token) {
    return this.response.body = json({
      verify: false
    });
  }
  let verify = jwt.verify(token, config.TOKEN_KEY);
  let userInfo = yield user.findUser({ 'account': verify.account });
  if (!userInfo) {
    return this.response.body = {
      verify: false,
      user: {}
    }
  } else {
    publishedPapers = yield paper.findPapers({
      'creator': verify.account
    });
    answeredPapers = yield paper.findPapers({
      'answers.answerer': verify.account
    });
  }
  return this.response.body = json({
    verify: userInfo ? true : false,
    user: userInfo ? userInfo : {},
    publishedPapers: publishedPapers ? publishedPapers : [],
    answeredPapers: answeredPapers ? answeredPapers : []
  });
});

module.exports = router;
