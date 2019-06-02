"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  LearningArea: {
    owner: function () {
      var _owner = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(learningArea, args, _ref) {
        var models;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                models = _ref.models;
                return _context.abrupt("return", models.User.findOne({
                  where: {
                    id: learningArea.userId
                  }
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function owner(_x, _x2, _x3) {
        return _owner.apply(this, arguments);
      }

      return owner;
    }(),
    items: function () {
      var _items = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(learningArea, args, _ref2) {
        var models;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref2.models;
                return _context2.abrupt("return", models.ItemToLearn.findAll({
                  where: {
                    learningAreaId: learningArea.id
                  }
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function items(_x4, _x5, _x6) {
        return _items.apply(this, arguments);
      }

      return items;
    }()
  },
  Query: {
    learningAreas: function () {
      var _learningAreas = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(root, _ref3, _ref4) {
        var userId, models, user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userId = _ref3.userId;
                models = _ref4.models, user = _ref4.user;
                return _context3.abrupt("return", models.LearningArea.findAll({
                  where: {
                    userId: userId || user.id
                  }
                }));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function learningAreas(_x7, _x8, _x9) {
        return _learningAreas.apply(this, arguments);
      }

      return learningAreas;
    }()
  },
  Mutation: {
    createLearningArea: {
      authentication: true,
      resolve: function () {
        var _resolve = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4(root, _ref5, _ref6) {
          var name, description, models, user;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  name = _ref5.name, description = _ref5.description;
                  models = _ref6.models, user = _ref6.user;
                  _context4.next = 4;
                  return models.LearningArea.create({
                    userId: user.id,
                    name: name,
                    description: description
                  });

                case 4:
                  return _context4.abrupt("return", _context4.sent);

                case 5:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function resolve(_x10, _x11, _x12) {
          return _resolve.apply(this, arguments);
        }

        return resolve;
      }()
    },
    deleteLearningArea: {
      authentication: true,
      resolve: function () {
        var _resolve2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee5(root, _ref7, _ref8) {
          var id, models, user, learningArea, learningItemCount;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  id = _ref7.id;
                  models = _ref8.models, user = _ref8.user;
                  _context5.next = 4;
                  return models.LearningArea.findOne({
                    where: {
                      id: id,
                      userId: user.id
                    }
                  });

                case 4:
                  learningArea = _context5.sent;

                  if (learningArea) {
                    _context5.next = 7;
                    break;
                  }

                  return _context5.abrupt("return", {
                    error: 'Anauthorized'
                  });

                case 7:
                  _context5.next = 9;
                  return learningArea.countItems();

                case 9:
                  learningItemCount = _context5.sent;

                  if (!(learningItemCount === 0)) {
                    _context5.next = 14;
                    break;
                  }

                  _context5.next = 13;
                  return models.LearningArea.destroy({
                    where: {
                      id: id
                    }
                  });

                case 13:
                  return _context5.abrupt("return", {});

                case 14:
                  return _context5.abrupt("return", {
                    error: 'Cannot be deleted'
                  });

                case 15:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function resolve(_x13, _x14, _x15) {
          return _resolve2.apply(this, arguments);
        }

        return resolve;
      }()
    }
  }
};
exports.default = _default;