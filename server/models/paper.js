var mongoose = require('mongoose');
var db = require('./db-mongo.js');
var Schema = mongoose.Schema;
var Mixed = Schema.Types.Mixed;
var paper = new Schema({
  creator: { type: String }, // account of the creator user
  title: { type: String },
  questions: { type: Mixed },
  classId: { type: String },
  timeLimit: { type: Number, default: 7200 },
  answers: { type: Array },
  createdAt: { type: Date, default: Date.now },
  closingDate: {type: Date }
});

paper.statics.findPaper = function (op) {
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
paper.statics.findPapers = function (op) {
  return new Promise((resolve, reject) => {
    this.find(op, (err, result) => {
      if (err) {
        reject(false);
      } else {
        resolve(result);
      }
    });
  });
};
paper.statics.createPaper = function (op) {
  return new Promise((resolve, reject) => {
    this.create(op, (err) => {
      if (err) {
        reject({ success: false, errMsg: err });
      } else {
        resolve(op);
      }
    });
  });
};
paper.statics.removePaper = function (op) {
  return new Promise((resolve, reject) => {
    this.remove(op, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
paper.statics.getPapers = function (op) {
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
paper.statics.removeAnswer = function (op, data) {
  return new Promise((resolve, reject) => {
    this.update(op, {
      '$pull': {
        'answers': {
          'answerer': data.answerer
        }
      }
    }, (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
paper.statics.setAnswer = function (op, data) {
  return new Promise((resolve, reject) => {
    this.update(op, {
      '$push': {
        'answers': data
      }
    }, (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
paper.statics.getAnswer = function (op) {
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
paper.statics.getScore = function (op) {
  return new Promise((resolve, reject) => {
    this.mapReduce(op, (err, result) => { // 对每个question中的score求和
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = db.model('papers', paper);
