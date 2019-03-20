"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  ChapterGroup: {
    chapters: function () {
      var _chapters = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(chapterGroup, args, _ref) {
        var models, chapterListOrder, chapters;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                models = _ref.models;
                chapterListOrder = chapterGroup.chapterListOrder;
                _context.next = 4;
                return models.Chapter.findAll({
                  where: {
                    id: chapterListOrder
                  },
                  attributes: ['id', 'title']
                });

              case 4:
                chapters = _context.sent;
                return _context.abrupt("return", _lodash.default.sortBy(chapters, function (chapter) {
                  return chapterListOrder.indexOf(chapter.id);
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function chapters(_x, _x2, _x3) {
        return _chapters.apply(this, arguments);
      }

      return chapters;
    }()
  },
  Query: {
    myChapterGroups: {
      authentication: true,
      resolve: function () {
        var _resolve = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(root, args, _ref2) {
          var models, user;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  models = _ref2.models, user = _ref2.user;
                  return _context2.abrupt("return", models.ChapterGroup.findAll({
                    where: {
                      userId: user.id
                    }
                  }));

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function resolve(_x4, _x5, _x6) {
          return _resolve.apply(this, arguments);
        }

        return resolve;
      }()
    },
    chapterGroups: function () {
      var _chapterGroups = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(root, _ref3, _ref4) {
        var userId, models, user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userId = _ref3.userId;
                models = _ref4.models, user = _ref4.user;
                _context3.prev = 2;
                return _context3.abrupt("return", models.ChapterGroup.findAll({
                  where: {
                    userId: userId
                  }
                }));

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](2);
                console.log(_context3.t0);
                throw _context3.t0;

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 6]]);
      }));

      function chapterGroups(_x7, _x8, _x9) {
        return _chapterGroups.apply(this, arguments);
      }

      return chapterGroups;
    }()
  },
  Mutation: {
    createChapter: {
      authentication: true,
      resolve: function () {
        var _resolve2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4(root, _ref5, _ref6) {
          var type, models, user, chapterGroup, _ref7, group, chapter;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  type = _ref5.type;
                  models = _ref6.models, user = _ref6.user;
                  _context4.prev = 2;
                  _context4.next = 5;
                  return models.ChapterGroup.findOne({
                    where: {
                      userId: user.id,
                      type: type
                    }
                  });

                case 5:
                  chapterGroup = _context4.sent;

                  if (chapterGroup) {
                    _context4.next = 8;
                    break;
                  }

                  throw new Error('Not found type');

                case 8:
                  _context4.next = 10;
                  return models.ChapterGroup.createNewChapter(chapterGroup);

                case 10:
                  _ref7 = _context4.sent;
                  group = _ref7.group;
                  chapter = _ref7.chapter;
                  return _context4.abrupt("return", {
                    chapterGroup: group,
                    chapter: chapter
                  });

                case 16:
                  _context4.prev = 16;
                  _context4.t0 = _context4["catch"](2);
                  throw _context4.t0;

                case 19:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[2, 16]]);
        }));

        function resolve(_x10, _x11, _x12) {
          return _resolve2.apply(this, arguments);
        }

        return resolve;
      }()
    },
    deleteChapter: {
      authentication: true,
      resolve: function () {
        var _resolve3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee5(root, _ref8, _ref9) {
          var type, id, models, user, chapterGroup, chapter;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  type = _ref8.type, id = _ref8.id;
                  models = _ref9.models, user = _ref9.user;
                  _context5.prev = 2;
                  _context5.next = 5;
                  return models.ChapterGroup.findOne({
                    where: {
                      userId: user.id,
                      type: type
                    }
                  });

                case 5:
                  chapterGroup = _context5.sent;

                  if (chapterGroup) {
                    _context5.next = 8;
                    break;
                  }

                  throw new Error('Not found type');

                case 8:
                  _context5.next = 10;
                  return models.Chapter.findOne({
                    where: {
                      id: id,
                      chapterGroupId: chapterGroup.id
                    }
                  });

                case 10:
                  chapter = _context5.sent;

                  if (chapter) {
                    _context5.next = 13;
                    break;
                  }

                  throw new Error('Not found chapter');

                case 13:
                  return _context5.abrupt("return", models.ChapterGroup.deleteChapter(chapterGroup, chapter));

                case 16:
                  _context5.prev = 16;
                  _context5.t0 = _context5["catch"](2);
                  console.log(_context5.t0);
                  throw _context5.t0;

                case 20:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[2, 16]]);
        }));

        function resolve(_x13, _x14, _x15) {
          return _resolve3.apply(this, arguments);
        }

        return resolve;
      }()
    },
    reorderChapters: {
      authentication: true,
      resolve: function () {
        var _resolve4 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee6(root, _ref10, _ref11) {
          var chapterGroupId, newOrder, models, user, chapterGroup;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  chapterGroupId = _ref10.chapterGroupId, newOrder = _ref10.newOrder;
                  models = _ref11.models, user = _ref11.user;
                  _context6.next = 4;
                  return models.ChapterGroup.findOne({
                    where: {
                      userId: user.id,
                      id: chapterGroupId
                    }
                  });

                case 4:
                  chapterGroup = _context6.sent;

                  if (chapterGroup) {
                    _context6.next = 7;
                    break;
                  }

                  throw new Error('Not found type');

                case 7:
                  return _context6.abrupt("return", models.ChapterGroup.reorderChapters(chapterGroup, newOrder));

                case 8:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function resolve(_x16, _x17, _x18) {
          return _resolve4.apply(this, arguments);
        }

        return resolve;
      }()
    }
  }
};
exports.default = _default;