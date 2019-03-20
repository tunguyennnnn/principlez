"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _apolloServerExpress = require("apollo-server-express");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _models = _interopRequireDefault(require("../models"));

var _graphql = require("./graphql");

var _middlewares = _interopRequireDefault(require("./graphql/middlewares"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var server = new _apolloServerExpress.ApolloServer({
  schema: _graphql.schemaWithMiddleware,
  uploads: {
    maxFileSize: 10000000,
    // 10 MB
    maxFiles: 20
  },
  middlewares: _middlewares.default,
  context: function () {
    var _context = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var req;
      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = _ref.req;
              return _context2.abrupt("return", {
                models: _models.default,
                req: req
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, this);
    }));

    function context(_x) {
      return _context.apply(this, arguments);
    }

    return context;
  }()
});
var app = (0, _express.default)();
app.listen(4000, function () {
  console.log('Apigateway listening on port 4000!');
});
app.use(_bodyParser.default.json());
app.all('*', (0, _cors.default)());
server.applyMiddleware({
  app: app,
  path: '/graphql'
});
app.use(_express.default.static(_path.default.join(__dirname, '..', 'public')));
app.get('*', function (req, res) {
  res.sendFile(_path.default.join(__dirname, '..', 'public/index.html'));
});