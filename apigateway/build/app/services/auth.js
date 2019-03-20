"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = generateToken;
exports.authCheck = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = _interopRequireDefault(require("../../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var superSecret = process.env.superSecret || 'some secret';

function generateToken(user) {
  return {
    token: _jsonwebtoken.default.sign(user, superSecret, {
      expiresIn: 60 * 60 * 24 * 30
    }),
    expiresIn: 60 * 60 * 24 * 30
  };
}

var authCheck =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req) {
    var headers, decoded, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            headers = req.headers;

            if (!(headers.authorization && headers.authorization.split(' ')[0] === 'Bearer')) {
              _context.next = 7;
              break;
            }

            decoded = _jsonwebtoken.default.verify(headers.authorization.split(' ')[1], superSecret);
            _context.next = 5;
            return _models.default.User.findOne({
              where: {
                id: decoded.id
              }
            });

          case 5:
            user = _context.sent;
            return _context.abrupt("return", user);

          case 7:
            return _context.abrupt("return", null);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function authCheck(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.authCheck = authCheck;