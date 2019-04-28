"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getSearchSpec(text) {
  if (text.startsWith('@')) {
    return {
      type: 'User',
      text: text.substring(1),
      __typename: 'UserSearchResult'
    };
  }

  if (text.startsWith('#')) {
    return {
      type: 'Tag',
      text: text.substring(1),
      __typename: 'TagSearchResult'
    };
  }

  return {
    type: 'Chapter',
    text: text,
    __typename: 'StorySearchResult'
  };
}

var _default = {
  Query: {
    search: function () {
      var _search = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(root, _ref, _ref2) {
        var text, models, spec, model, results, __typename;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                text = _ref.text;
                models = _ref2.models;
                spec = getSearchSpec(text);
                model = models[spec.type];

                if (!(spec.text.length === 0)) {
                  _context.next = 6;
                  break;
                }

                throw new Error('Not valid search');

              case 6:
                if (!(!model || !model.search)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", []);

              case 8:
                _context.next = 10;
                return model.search(spec.text);

              case 10:
                results = _context.sent;
                __typename = spec.__typename;
                return _context.abrupt("return", results.map(function (result) {
                  return _objectSpread({
                    __typename: __typename
                  }, result.toJSON ? result.toJSON() : result);
                }));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function search(_x, _x2, _x3) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }
};
exports.default = _default;