'use strict'
let router = require('koa-router')();
let user = require('../models/user');
let paper = require('../models/paper');
let config = require('../../configs/config');
let jwt = require('jsonwebtoken');

/*
 * 创建新试卷表单页
 */
router.get('/create', function* (next) {
  yield this.render('index', {
    title: '编辑问卷'
  });
});

/*
 * 试卷详情页，编辑/答卷
 */
router.get('/paper', function* (next) {
  yield this.render('index', {
    title: '问卷详情'
  });
});

/*
 * 新建or编辑
 */
router.post('/edit', function* (next) {
  let body = this.request.body;
  let _id = body._id;
  let msg = _id ? '编辑' : '创建';
  let result;
  body.creator = jwt.verify(body.token, config.TOKEN_KEY).account;
  if (!body.creator) {
    return this.body = {
      success: false,
      errMsg: '请先登录'
    };
  }
  delete body.token;
  if (_id) {
    result = yield paper.updatePaper({
      '_id': _id,
      'creator': body.creator
    }, body);
  } else {
    result = yield paper.createPaper(body);
  }
  if (result) {
    return this.response.body = {
      success: true,
      errMsg: msg + '问卷成功'
    };
  }
  return this.body = {
    success: false,
    errMsg: msg + '问卷失败, 请重试'
  };
});

/*
 * 改变状态
 */
router.put('/paper', function* (next) {
  let body = this.request.body;
  let account = jwt.verify(body.token, config.TOKEN_KEY).account;
  if (!account) {
    return this.response.body = {
      success: false,
      errMsg: '登录超时'
    };
  }
  let result = yield paper.publishPaper({
    '_id': body._id,
    'creator': account
  });
  if (result) {
    return this.response.body = {
      success: true,
      errMsg: '发布成功'
    };
  }
  return this.body = {
    success: false,
    errMsg: '发布失败, 请重试'
  };
});

/*
 * 删除问卷
 */
router.delete('/paper', function* (next) {
  let body = this.request.body;
  let account = jwt.verify(body.token, config.TOKEN_KEY).account;
  if (!account) {
    return this.response.body = {
      success: false,
      errMsg: '登录超时'
    };
  }
  let result = yield paper.removePaper({
    '_id': body._id,
    'creator': account
  });
  if (result) {
    return this.response.body = {
      success: true,
      errMsg: '删除成功'
    };
  }
  return this.body = {
    success: false,
    errMsg: '删除失败'
  };
});

/*
 * 查询
 */
router.post('/search', function* (next) {
  let body = this.request.body;
  let keywords = body.keywords;
  let keywordsExp = new RegExp(keywords);
  let success = false;
  let errMsg = '查询试卷失败，请重试';
  let account = '';
  if (body.token) {
    account = jwt.verify(body.token, config.TOKEN_KEY).account;
  }
  let papers = yield paper.findPapers({
    'title': keywordsExp,
    'creator': { '$ne': account },
    'state': 1,
    'closingDate': { '$gt': new Date() }
  });
  if (papers) {
    success = true;
    errMsg = '查询成功';
  }
  return this.response.body = {
    success: success,
    papers: success ? papers : [],
    errMsg: errMsg
  };
});

/*
 * 提交答案
 */
router.post('/answer', function* (next) {
  let body = this.request.body;
  let _id = body._id;
  let answer = body.answer;
  delete body._id;
  let op = { '_id': _id };
  let result = yield paper.setAnswer(op, answer);
  return this.response.body = {
    success: result,
    errMsg: result ? '提交成功,感谢您的参与' : '提交问卷失败,请重试'
  };
});

module.exports = router;
