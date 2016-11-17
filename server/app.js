'use strict'
let app = require('koa')();
let router = require('koa-router')();
let serve = require('koa-static');
let views = require('koa-views');
let logger = require('koa-logger');
let json = require('koa-json');
let http = require('http');
let bodyParser = require('koa-bodyparser');

let config = require('../configs/config.js');
let db = require('./models/db-mongo.js');
let paper = require('./models/paper.js');
let user = require('./models/user.js');

let indexRouter = require('./routes/index');
let signInRouter = require('./routes/signIn');
let signUpRouter = require('./routes/signUp');
let archivesRouter = require('./routes/archives');
let papersRouter = require('./routes/papers');
let profileRouter = require('./routes/profile');
let verifyRouter = require('./routes/verify');
let settingsRouter = require('./routes/settings');

app.use(bodyParser());
app.use(views(__dirname + '/views', { extension: 'pug' }));
app.use(serve(__dirname + '/public'));
app.use(logger());
app.use(json());

router.use('/', indexRouter.routes(), indexRouter.allowedMethods());
router.use('/signUp', signUpRouter.routes(), signUpRouter.allowedMethods());
router.use('/signIn', signInRouter.routes(), signInRouter.allowedMethods());
router.use('/archives', archivesRouter.routes(), archivesRouter.allowedMethods());
router.use('/papers', papersRouter.routes(), papersRouter.allowedMethods());
router.use('/profile', profileRouter.routes(), profileRouter.allowedMethods());
router.use('/verify', verifyRouter.routes(), verifyRouter.allowedMethods());
router.use('/settings', settingsRouter.routes(), settingsRouter.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', function (err, ctx) {
  log.error('server error: ' + err + ctx);
});

let server = http.Server(app.callback());

server.listen(config.PORT);
console.log('listening on port:' + config.PORT);
