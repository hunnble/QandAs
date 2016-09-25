var router = require('koa-router')();

router.get('/', function* (next) {
  yield this.render('index', {
    title: '陆壹'
  });
});

module.exports = router;
