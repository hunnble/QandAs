'use strict'
let router = require('koa-router')();

router.get('/', function* (next) {
  yield this.render('index', {
    title: 'QandA'
  });
});

module.exports = router;
