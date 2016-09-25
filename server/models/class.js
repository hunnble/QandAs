var mongoose = require('mongoose');
var db = require('./db-mongo.js');
var Schema = mongoose.Schema;
var klass = new Schema({
  id: { type: String },
  className: { type: String },
  builder: { type: String },
  students: { type: [String] }
});

klass.statics.findClass = function (op) {
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
klass.statics.findClasses = function (op) {
  return new Promise((resolve, reject) => {
    this.find(op, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
klass.statics.createClass = function (op) {
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
klass.statics.removeClass = function (op) {
  return new Promise((resolve, reject) => {
    this.remove(op, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
klass.statics.updateStudents = function (op) {
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

module.exports = db.model('classes', klass);
