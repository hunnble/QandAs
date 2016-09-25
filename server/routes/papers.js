let router = require('koa-router')();
let user = require('../models/user');
let paper = require('../models/paper');

/*
 * 创建新试卷表单页
 */
router.get('/create', function* (next) {
  yield this.render('index', {
    title: '创建新试卷'
  });
});

/*
 * 试卷详情页，编辑/答卷
 */
router.get('/paper', function* (next) {
  yield this.render('index', {
    title: '卷吧'
  });
});

/*
 * 新建or编辑
 */
router.post('/edit', function* (next) {
  let body = this.request.body;
  let _id = body._id;
  let msg = _id ? '编辑' : '创建';
  let paperResult;
  if (_id) {
    paperResult = yield paper.updatePaper({ '_id': _id }, body);
  } else {
    paperResult = yield paper.createPaper(body);
  }
  if (paperResult) {
    return this.response.body = {
      success: true,
      errMsg: msg + '成功'
    };
  }
  return this.body = {
    success: false,
    errMsg: msg + '失败'
  };
});

/*
 * 查询
 */
router.post('/search', function* (next) {
  let body = this.request.body;
  let keywords = body.keywords;
  let account = body.account;
  let keywordsExp = new RegExp(keywords);
  let success = false;
  let errMsg = '查询试卷失败，请重试';
  let papers = yield paper.findPapers({
    'title': keywordsExp,
    'creator':{ '$ne': account }
  });
  if (papers && papers.length !== 0) {
    success = true;
    errMsg = '查询成功';
  } else if (papers.length === 0) {
    errMsg = '无相关试卷，请换个关键词查询';
  }
  return this.response.body = {
    success: success,
    papers: success ? papers : [],
    errMsg: errMsg
  }
});

/*
 * 提交答案
 */
router.post('/answer', function* (next) {
 let body = this.request.body;
 let data = [];
 let _id = body._id;
 let answerer = body.answerer;
 delete body._id;
 delete body.answerer;
 for (let key in body) {
   let index = -1;
   if (key.indexOf('_') !== -1) {
     index = Number(key.split('_')[0].slice(1));
     if (!data[index]) {
       data[index] = [];
     }
     data[index].push(Number(key.split('_')[1]));
   } else {
     index = Number(key.slice(1));
     data[index] = body[key];
   }
 }
 let result = yield paper.setAnswer({ '_id': _id }, {
   'answerer': answerer,
   'answer': data
 });
 return this.response.body = {
   success: result,
   errMsg: result ? '回答成功' : '出错了，请重试'
 };
});

module.exports = router;
