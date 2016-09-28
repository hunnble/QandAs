var mongoose = require('mongoose');
var db = require('./db-mongo.js');
var Schema = mongoose.Schema;
var Mixed = Schema.Types.Mixed;
var paper = new Schema({
  creator: { type: String }, // account of the creator user
  title: { type: String },
  questions: { type: Mixed },
  // classId: { type: String },
  state: { type: Number, default: 0 }, // 0: editable, 1: published, 2: finished
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
paper.statics.publishPaper = function (op) {
  return new Promise((resolve, reject) => {
    this.update(op, {
      'state': 1
    }, (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
paper.statics.expirePaper = function (op) {
  return new Promise((resolve, reject) => {
    this.update(op, {
      'state': 2
    }, (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = db.model('papers', paper);
