"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = require("../../services/auth");

var _bcrypt = require("../../services/bcrypt");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  User: {
    profileImage: function profileImage() {
      return {
        large: 'https://avatarfiles.alphacoders.com/715/71560.jpg',
        medium: 'https://avatarfiles.alphacoders.com/715/71560.jpg',
        thumb: 'https://avatarfiles.alphacoders.com/715/71560.jpg'
      };
    },
    authToken: function authToken(user) {
      var id = user.id,
          email = user.email,
          createdAt = user.createdAt;
      return (0, _auth.generateToken)({
        id: id,
        email: email,
        createdAt: createdAt
      });
    },
    location: function () {
      var _location = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(user, args, _ref) {
        var models;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                models = _ref.models;
                _context.next = 3;
                return user.getLocation();

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function location(_x, _x2, _x3) {
        return _location.apply(this, arguments);
      }

      return location;
    }()
  },
  Query: {
    me: function () {
      var _me = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(root, args, _ref2) {
        var models, user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref2.models, user = _ref2.user;

                if (user) {
                  _context2.next = 3;
                  break;
                }

                throw new Error('Not authenticated');

              case 3:
                return _context2.abrupt("return", user);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function me(_x4, _x5, _x6) {
        return _me.apply(this, arguments);
      }

      return me;
    }(),
    user: function () {
      var _user2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(root, _ref3, _ref4) {
        var id, models, _user;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref3.id;
                models = _ref4.models, _user = _ref4.user;
                return _context3.abrupt("return", models.User.findOne({
                  id: id
                }));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function user(_x7, _x8, _x9) {
        return _user2.apply(this, arguments);
      }

      return user;
    }()
  },
  Mutation: {
    signup: function () {
      var _signup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(root, _ref5, _ref6) {
        var email, fullname, password, location, yearOfBirth, models, userLocation, bcryptPassword, user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                email = _ref5.email, fullname = _ref5.fullname, password = _ref5.password, location = _ref5.location, yearOfBirth = _ref5.yearOfBirth;
                models = _ref6.models;
                _context4.prev = 2;
                _context4.next = 5;
                return models.Location.findOneOrCreate(location);

              case 5:
                userLocation = _context4.sent;
                _context4.next = 8;
                return (0, _bcrypt.encrypt)(password);

              case 8:
                bcryptPassword = _context4.sent;
                _context4.next = 11;
                return models.User.create({
                  email: email,
                  fullname: fullname,
                  password: bcryptPassword,
                  yearOfBirth: yearOfBirth,
                  locationId: userLocation.id
                });

              case 11:
                user = _context4.sent;
                _context4.next = 14;
                return models.ChapterGroup.createDefaultGroups(user.id);

              case 14:
                return _context4.abrupt("return", {
                  user: user
                });

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](2);
                return _context4.abrupt("return", {
                  error: _context4.t0.toString()
                });

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 17]]);
      }));

      function signup(_x10, _x11, _x12) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }(),
    login: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(root, _ref7, _ref8) {
        var email, password, models, user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                email = _ref7.email, password = _ref7.password;
                models = _ref8.models;
                _context5.prev = 2;
                _context5.next = 5;
                return models.User.findOne({
                  where: {
                    email: email
                  }
                });

              case 5:
                user = _context5.sent;
                _context5.t0 = !user;

                if (_context5.t0) {
                  _context5.next = 11;
                  break;
                }

                _context5.next = 10;
                return (0, _bcrypt.compare)(password, user.password);

              case 10:
                _context5.t0 = !_context5.sent;

              case 11:
                if (!_context5.t0) {
                  _context5.next = 13;
                  break;
                }

                throw new Error("Incorrect email or password");

              case 13:
                return _context5.abrupt("return", {
                  user: user
                });

              case 16:
                _context5.prev = 16;
                _context5.t1 = _context5["catch"](2);
                return _context5.abrupt("return", {
                  error: _context5.t1.toString()
                });

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 16]]);
      }));

      function login(_x13, _x14, _x15) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }
};
exports.default = _default;