var mongoose = require('mongoose');
var db = require('./db-mongo.js');
var Schema = mongoose.Schema;
var Mixed = Schema.Types.Mixed;
var user = new Schema({
  account: { type: String },
  avatar: { type: String, default: './images/avatar.png' },
  password: { type: String },
  nickname: { type: String, default: '' },
  mail: { type: String, default: '' },
  info: { type: String, default: '' },
  settings: { type: Mixed },
  createdAt: { type: Date, default: new Date() }
});

user.statics.findUserWithPassword = function (op) {
  return new Promise((resolve, reject) => {
    this.findOne(op, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
user.statics.findUser = function (op) {
  return new Promise((resolve, reject) => {
    this.findOne(op, {
      'password': 0
    }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
user.statics.findUsers = function (op) {
  return new Promise((resolve, reject) => {
    this.find(op, {
      'password': 0
    }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
user.statics.createUser = function (op) {
  return new Promise((resolve, reject) => {
    this.create(op, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
user.statics.updateUser = function (op, data) {
  return new Promise((resolve, reject) => {
    this.update(op, data, {
      multi: false
    }, (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
user.statics.createPaper = function (op) {
  return new Promise((resolve, reject) => {
    this.update(op, (err, result) => { // 数组push增加
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
user.statics.changeClass =  function (op) {
  return new Promise((resolve, reject) => {
    this.update(op, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = db.model('users', user);
