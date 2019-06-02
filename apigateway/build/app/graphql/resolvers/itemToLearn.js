"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  ItemToLearn: {
    owner: function () {
      var _owner = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(item, args, _ref) {
        var models;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                models = _ref.models;
                _context.next = 3;
                return models.User.findOne({
                  where: {
                    id: item.userId
                  }
                });

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
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
    }()
  },
  Query: {
    newLearningItems: function () {
      var _newLearningItems = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(root, _ref2, _ref3) {
        var userId, _ref2$learningAreaId, learningAreaId, limit, cursor, models, user, options, items, count;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = _ref2.userId, _ref2$learningAreaId = _ref2.learningAreaId, learningAreaId = _ref2$learningAreaId === void 0 ? null : _ref2$learningAreaId, limit = _ref2.limit, cursor = _ref2.cursor;
                models = _ref3.models, user = _ref3.user;
                userId = userId || user.id;
                options = {
                  where: {
                    userId: userId,
                    learningAreaId: learningAreaId
                  },
                  order: [['id', 'ASC']],
                  limit: limit
                };

                if (cursor) {
                  options.where.id = {
                    $gt: cursor
                  };
                }

                _context2.next = 7;
                return models.ItemToLearn.findAll(options);

              case 7:
                items = _context2.sent;
                _context2.next = 10;
                return models.ItemToLearn.count({
                  where: {
                    userId: userId,
                    learningAreaId: learningAreaId
                  }
                });

              case 10:
                count = _context2.sent;
                return _context2.abrupt("return", {
                  pageInfo: {
                    total: count,
                    hasNextPage: items.length >= limit,
                    hasPreviousPage: !!cursor
                  },
                  edges: items.map(function (item) {
                    return {
                      cursor: item.id,
                      node: item
                    };
                  })
                });

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function newLearningItems(_x4, _x5, _x6) {
        return _newLearningItems.apply(this, arguments);
      }

      return newLearningItems;
    }()
  },
  Mutation: {
    createItemToLearn: {
      authentication: true,
      resolve: function () {
        var _resolve = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(root, _ref4, _ref5) {
          var name, description, source, learningAreaId, models, user, learningArea;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  name = _ref4.name, description = _ref4.description, source = _ref4.source, learningAreaId = _ref4.learningAreaId;
                  models = _ref5.models, user = _ref5.user;

                  if (!learningAreaId) {
                    _context3.next = 8;
                    break;
                  }

                  _context3.next = 5;
                  return models.LearningArea.findOne({
                    where: {
                      id: learningAreaId
                    }
                  });

                case 5:
                  learningArea = _context3.sent;

                  if (learningArea) {
                    _context3.next = 8;
                    break;
                  }

                  throw new Error('Cannot find leaning area');

                case 8:
                  _context3.next = 10;
                  return models.ItemToLearn.create({
                    name: name,
                    description: description,
                    source: source,
                    learningAreaId: learningAreaId,
                    userId: user.id
                  });

                case 10:
                  return _context3.abrupt("return", _context3.sent);

                case 11:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function resolve(_x7, _x8, _x9) {
          return _resolve.apply(this, arguments);
        }

        return resolve;
      }()
    },
    deleteItemToLearn: {
      authentication: true,
      resolve: function () {
        var _resolve2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4(root, _ref6, _ref7) {
          var id, models, user;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  id = _ref6.id;
                  models = _ref7.models, user = _ref7.user;
                  _context4.next = 4;
                  return models.ItemToLearn.destroy({
                    where: {
                      id: id,
                      userId: user.id
                    }
                  });

                case 4:
                  return _context4.abrupt("return", {});

                case 5:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function resolve(_x10, _x11, _x12) {
          return _resolve2.apply(this, arguments);
        }

        return resolve;
      }()
    }
  }
};
exports.default = _default;