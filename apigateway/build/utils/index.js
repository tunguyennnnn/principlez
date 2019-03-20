"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasSameElements = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {*} a1 array
 * @param {*} a2 array
 * check if array 1 and 2 has the same elements;
 */
var hasSameElements = function hasSameElements(a1, a2) {
  if (a1.length !== a2.length) return false;
  return !_lodash.default.some(a2, function (el) {
    return !_lodash.default.includes(a1, el);
  });
};

exports.hasSameElements = hasSameElements;