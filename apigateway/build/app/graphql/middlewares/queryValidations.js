"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Validators = _interopRequireWildcard(require("./validators"));

var _auth = require("../../services/auth");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Query: function () {
    var _Query = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, root, args, context, info) {
      var queryField, user, validator, values;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              queryField = info.schema.getQueryType().getFields()[info.fieldName];
              _context.next = 3;
              return (0, _auth.authCheck)(context.req);

            case 3:
              user = _context.sent;
              context.user = user;

              if (!queryField.authentication) {
                _context.next = 8;
                break;
              }

              if (user) {
                _context.next = 8;
                break;
              }

              throw new Error('Anauthenticated');

            case 8:
              validator = Validators[info.fieldName];

              if (!validator) {
                _context.next = 24;
                break;
              }

              _context.prev = 10;
              _context.next = 13;
              return validator.validate(args);

            case 13:
              values = _context.sent;
              return _context.abrupt("return", resolve(root, values, context, info));

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](10);

              if (!(_context.t0 instanceof yup.ValidationError)) {
                _context.next = 23;
                break;
              }

              return _context.abrupt("return", {
                error: _context.t0.message
              });

            case 23:
              throw _context.t0;

            case 24:
              return _context.abrupt("return", resolve(root, args, context, info));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[10, 17]]);
    }));

    function Query(_x, _x2, _x3, _x4, _x5) {
      return _Query.apply(this, arguments);
    }

    return Query;
  }()
};
exports.default = _default;