"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    }(),
    isAuthor: function isAuthor(item, args, _ref2) {
      var user = _ref2.user;
      return item.userId === user.id;
    },
    learnNote: function () {
      var _learnNote = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(item, args, _ref3) {
        var models, _ref4, _ref5, learnNote;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref3.models;
                _context2.next = 3;
                return models.LearnNote.findOrCreate({
                  where: {
                    itemToLearnId: item.id
                  }
                });

              case 3:
                _ref4 = _context2.sent;
                _ref5 = _slicedToArray(_ref4, 1);
                learnNote = _ref5[0];
                return _context2.abrupt("return", learnNote);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function learnNote(_x4, _x5, _x6) {
        return _learnNote.apply(this, arguments);
      }

      return learnNote;
    }()
  },
  Query: {
    itemToLearn: function () {
      var _itemToLearn = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(root, _ref6, _ref7) {
        var id, models, user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref6.id;
                models = _ref7.models, user = _ref7.user;
                return _context3.abrupt("return", models.ItemToLearn.findOne({
                  where: {
                    id: id
                  }
                }));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function itemToLearn(_x7, _x8, _x9) {
        return _itemToLearn.apply(this, arguments);
      }

      return itemToLearn;
    }(),
    newLearningItems: function () {
      var _newLearningItems = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(root, _ref8, _ref9) {
        var userId, _ref8$learningAreaId, learningAreaId, limit, cursor, models, user, options, items, count;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userId = _ref8.userId, _ref8$learningAreaId = _ref8.learningAreaId, learningAreaId = _ref8$learningAreaId === void 0 ? null : _ref8$learningAreaId, limit = _ref8.limit, cursor = _ref8.cursor;
                models = _ref9.models, user = _ref9.user;
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

                _context4.next = 7;
                return models.ItemToLearn.findAll(options);

              case 7:
                items = _context4.sent;
                _context4.next = 10;
                return models.ItemToLearn.count({
                  where: {
                    userId: userId,
                    learningAreaId: learningAreaId
                  }
                });

              case 10:
                count = _context4.sent;
                return _context4.abrupt("return", {
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
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function newLearningItems(_x10, _x11, _x12) {
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
        regeneratorRuntime.mark(function _callee5(root, _ref10, _ref11) {
          var name, description, source, learningAreaId, models, user, learningArea;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  name = _ref10.name, description = _ref10.description, source = _ref10.source, learningAreaId = _ref10.learningAreaId;
                  models = _ref11.models, user = _ref11.user;

                  if (!learningAreaId) {
                    _context5.next = 8;
                    break;
                  }

                  _context5.next = 5;
                  return models.LearningArea.findOne({
                    where: {
                      id: learningAreaId
                    }
                  });

                case 5:
                  learningArea = _context5.sent;

                  if (learningArea) {
                    _context5.next = 8;
                    break;
                  }

                  throw new Error('Cannot find leaning area');

                case 8:
                  _context5.next = 10;
                  return models.ItemToLearn.create({
                    name: name,
                    description: description,
                    source: source,
                    learningAreaId: learningAreaId,
                    userId: user.id
                  });

                case 10:
                  return _context5.abrupt("return", _context5.sent);

                case 11:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function resolve(_x13, _x14, _x15) {
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
        regeneratorRuntime.mark(function _callee6(root, _ref12, _ref13) {
          var id, models, user;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  id = _ref12.id;
                  models = _ref13.models, user = _ref13.user;
                  _context6.next = 4;
                  return models.ItemToLearn.destroy({
                    where: {
                      id: id,
                      userId: user.id
                    }
                  });

                case 4:
                  return _context6.abrupt("return", {});

                case 5:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function resolve(_x16, _x17, _x18) {
          return _resolve2.apply(this, arguments);
        }

        return resolve;
      }()
    },
    updateLearnNote: {
      authentication: true,
      resolve: function () {
        var _resolve3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee7(root, _ref14, _ref15) {
          var id, body, models, user, itemToLearn, learnNote;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  id = _ref14.id, body = _ref14.body;
                  models = _ref15.models, user = _ref15.user;
                  _context7.next = 4;
                  return models.ItemToLearn.findOne({
                    where: {
                      id: id,
                      userId: user.id
                    }
                  });

                case 4:
                  itemToLearn = _context7.sent;

                  if (itemToLearn) {
                    _context7.next = 7;
                    break;
                  }

                  throw new Error('Not found');

                case 7:
                  _context7.next = 9;
                  return itemToLearn.getLearnNote();

                case 9:
                  learnNote = _context7.sent;
                  _context7.next = 12;
                  return learnNote.update({
                    body: body
                  });

                case 12:
                  return _context7.abrupt("return", _context7.sent);

                case 13:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function resolve(_x19, _x20, _x21) {
          return _resolve3.apply(this, arguments);
        }

        return resolve;
      }()
    }
  }
};
exports.default = _default;