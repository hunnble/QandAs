'use strict'
let mongoose = require('mongoose');
let config = require('../../configs/mongo-config.js');

let mongoUrl = config.URL ? config.URL : ('mongodb://' + config.HOST + ':' + config.PORT + '/' + config.DBNAME);
let db = mongoose.createConnection(mongoUrl);

module.exports = db;
