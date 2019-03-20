"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemaWithMiddleware = exports.resolvers = exports.typeDefs = void 0;

var _path = _interopRequireDefault(require("path"));

var _middlewares = _interopRequireDefault(require("./middlewares"));

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('graphql-tools'),
    makeExecutableSchema = _require.makeExecutableSchema;

var _require2 = require('graphql-middleware'),
    applyMiddleware = _require2.applyMiddleware;

var typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)((0, _mergeGraphqlSchemas.fileLoader)(_path.default.join(__dirname, './schema')));
exports.typeDefs = typeDefs;
var resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)((0, _mergeGraphqlSchemas.fileLoader)(_path.default.join(__dirname, './resolvers')));
exports.resolvers = resolvers;
var schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});
var schemaWithMiddleware = applyMiddleware.apply(void 0, [schema].concat(_toConsumableArray(_middlewares.default)));
exports.schemaWithMiddleware = schemaWithMiddleware;