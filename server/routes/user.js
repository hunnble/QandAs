let router = require('koa-router')();
let paper = require('../models/paper');

router.post('/papers', function* (next) {
  let body = this.request.body;
  let account = body.account;
  let publishedPapers = yield paper.findPapers({ 'creator': account });
  let answeredPapers = yield paper.findPapers({  });
  return this.response.body = {
    publishedPapers,
    answeredPapers
  }
});

module.exports = router;
