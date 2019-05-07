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
    }(),
    users: function () {
      var _users = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(root, args, _ref5) {
        var models, user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                models = _ref5.models, user = _ref5.user;
                return _context4.abrupt("return", models.User.findAll());

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function users(_x10, _x11, _x12) {
        return _users.apply(this, arguments);
      }

      return users;
    }()
  },
  Mutation: {
    signup: function () {
      var _signup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(root, _ref6, _ref7) {
        var email, fullname, password, location, yearOfBirth, models, userLocation, bcryptPassword, user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                email = _ref6.email, fullname = _ref6.fullname, password = _ref6.password, location = _ref6.location, yearOfBirth = _ref6.yearOfBirth;
                models = _ref7.models;
                _context5.prev = 2;
                _context5.next = 5;
                return models.Location.findOneOrCreate(location);

              case 5:
                userLocation = _context5.sent;
                _context5.next = 8;
                return (0, _bcrypt.encrypt)(password);

              case 8:
                bcryptPassword = _context5.sent;
                _context5.next = 11;
                return models.User.create({
                  email: email,
                  fullname: fullname,
                  password: bcryptPassword,
                  yearOfBirth: yearOfBirth,
                  locationId: userLocation.id
                });

              case 11:
                user = _context5.sent;
                _context5.next = 14;
                return models.ChapterGroup.createDefaultGroups(user.id);

              case 14:
                return _context5.abrupt("return", {
                  user: user
                });

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5["catch"](2);
                return _context5.abrupt("return", {
                  error: _context5.t0.toString()
                });

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 17]]);
      }));

      function signup(_x13, _x14, _x15) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }(),
    login: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(root, _ref8, _ref9) {
        var email, password, models, user;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                email = _ref8.email, password = _ref8.password;
                models = _ref9.models;
                _context6.prev = 2;
                _context6.next = 5;
                return models.User.findOne({
                  where: {
                    email: email
                  }
                });

              case 5:
                user = _context6.sent;
                _context6.t0 = !user;

                if (_context6.t0) {
                  _context6.next = 11;
                  break;
                }

                _context6.next = 10;
                return (0, _bcrypt.compare)(password, user.password);

              case 10:
                _context6.t0 = !_context6.sent;

              case 11:
                if (!_context6.t0) {
                  _context6.next = 13;
                  break;
                }

                throw new Error("Incorrect email or password");

              case 13:
                return _context6.abrupt("return", {
                  user: user
                });

              case 16:
                _context6.prev = 16;
                _context6.t1 = _context6["catch"](2);
                return _context6.abrupt("return", {
                  error: _context6.t1.toString()
                });

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 16]]);
      }));

      function login(_x16, _x17, _x18) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),
    updateUserInfo: {
      authentication: true,
      resolve: function () {
        var _resolve = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee7(root, _ref10, _ref11) {
          var fullname, yearOfBirth, blurb, occupation, models, user, newUser;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  fullname = _ref10.fullname, yearOfBirth = _ref10.yearOfBirth, blurb = _ref10.blurb, occupation = _ref10.occupation;
                  models = _ref11.models, user = _ref11.user;
                  _context7.prev = 2;
                  _context7.next = 5;
                  return user.update({
                    fullname: fullname || user.fullname,
                    yearOfBirth: yearOfBirth || user.yearOfBirth,
                    blurb: blurb || user.blurb,
                    occupation: occupation || user.occupation
                  });

                case 5:
                  newUser = _context7.sent;
                  return _context7.abrupt("return", {
                    user: newUser
                  });

                case 9:
                  _context7.prev = 9;
                  _context7.t0 = _context7["catch"](2);
                  return _context7.abrupt("return", {
                    error: _context7.t0.toString()
                  });

                case 12:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this, [[2, 9]]);
        }));

        function resolve(_x19, _x20, _x21) {
          return _resolve.apply(this, arguments);
        }

        return resolve;
      }()
    }
  }
};
exports.default = _default;