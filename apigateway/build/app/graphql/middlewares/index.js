"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mutationValidations = _interopRequireDefault(require("./mutationValidations"));

var _queryValidations = _interopRequireDefault(require("./queryValidations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [_mutationValidations.default, _queryValidations.default];
exports.default = _default;