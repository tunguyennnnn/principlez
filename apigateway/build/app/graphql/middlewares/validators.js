"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.signup = void 0;

var yup = _interopRequireWildcard(require("yup"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var signup = yup.object().shape({
  email: yup.string().trim().email(),
  fullname: yup.string().trim().min(3, 'Fullname is too short').matches(/^[a-zA-Z-_0-9 \.]+$/, 'Invalid name'),
  yearOfBirth: yup.string().trim().length(4, 'Example 1975')
});
exports.signup = signup;
var login = yup.object().shape({
  email: yup.string().trim().email(),
  password: yup.string().trim().min(8, 'Invalid password')
});
exports.login = login;