'use strict'
let router = require('koa-router')();

router.get('/', function* (next) {
  yield this.render('index', {
    title: '问卷管理'
  });
});

module.exports = router;
