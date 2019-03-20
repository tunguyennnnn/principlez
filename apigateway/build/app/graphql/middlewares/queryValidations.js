"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = require("../../services/auth");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Query: function () {
    var _Query = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, root, args, context, info) {
      var mutationField, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mutationField = info.schema.getQueryType().getFields()[info.fieldName];
              _context.next = 3;
              return (0, _auth.authCheck)(context.req);

            case 3:
              user = _context.sent;
              context.user = user;

              if (!mutationField.authentication) {
                _context.next = 8;
                break;
              }

              if (user) {
                _context.next = 8;
                break;
              }

              throw new Error('Anauthenticated');

            case 8:
              return _context.abrupt("return", resolve(root, args, context, info));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function Query(_x, _x2, _x3, _x4, _x5) {
      return _Query.apply(this, arguments);
    }

    return Query;
  }()
};
exports.default = _default;