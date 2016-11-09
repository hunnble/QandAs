var mongoose = require('mongoose');
var db = require('./db-mongo.js');
var Schema = mongoose.Schema;
var Mixed = Schema.Types.Mixed;
var paper = new Schema({
  creator: { type: String }, // account of the creator user
  title: { type: String },
  detail: { type: String },
  questions: { type: Mixed },
  state: { type: Number, default: 0 }, // 0: unpublished, 1: published
  time: {
    type: Mixed,
    default: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate()
    }
  },
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
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
paper.statics.updatePaper = function (op, data) {
  return new Promise((resolve, reject) => {
    this.update(op, data, (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
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
