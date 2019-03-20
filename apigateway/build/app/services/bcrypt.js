"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encrypt = encrypt;
exports.compare = compare;

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

function encrypt(string) {
  return new Promise(function (resolve, reject) {
    _bcryptNodejs.default.hash(string, null, null, function (err, hash) {
      if (err) {
        reject(err);
        return;
      }

      resolve(hash);
    });
  });
}

function compare(string, hash) {
  return new Promise(function (resolve, reject) {
    _bcryptNodejs.default.compare(string, hash, function (err, res) {
      if (err) {
        reject(err);
        return;
      }

      resolve(res);
    });
  });
}