"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Mutation: {
    likeChapter: {
      authentication: true,
      resolve: function () {
        var _resolve = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(root, _ref, _ref2) {
          var chapterId, models, user, chapter, liked;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  chapterId = _ref.chapterId;
                  models = _ref2.models, user = _ref2.user;
                  _context.next = 4;
                  return models.Chapter.findOne({
                    where: {
                      id: chapterId
                    }
                  });

                case 4:
                  chapter = _context.sent;

                  if (chapter) {
                    _context.next = 7;
                    break;
                  }

                  throw new Error('Resource not found');

                case 7:
                  _context.next = 9;
                  return models.ChapterLike.addLike(chapterId, user.id);

                case 9:
                  liked = !!_context.sent;
                  _context.t0 = liked;
                  _context.next = 13;
                  return models.ChapterLike.count({
                    where: {
                      chapterId: chapterId
                    }
                  });

                case 13:
                  _context.t1 = _context.sent;
                  return _context.abrupt("return", {
                    liked: _context.t0,
                    count: _context.t1
                  });

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function resolve(_x, _x2, _x3) {
          return _resolve.apply(this, arguments);
        }

        return resolve;
      }()
    },
    unlikeChapter: {
      authentication: true,
      resolve: function () {
        var _resolve2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(root, _ref3, _ref4) {
          var chapterId, models, user, chapter;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  chapterId = _ref3.chapterId;
                  models = _ref4.models, user = _ref4.user;
                  _context2.next = 4;
                  return models.Chapter.findOne({
                    where: {
                      id: chapterId
                    }
                  });

                case 4:
                  chapter = _context2.sent;

                  if (chapter) {
                    _context2.next = 7;
                    break;
                  }

                  throw new Error('Resource not found');

                case 7:
                  _context2.next = 9;
                  return models.ChapterLike.removeLike(chapterId, user.id);

                case 9:
                  _context2.next = 11;
                  return models.ChapterLike.count({
                    where: {
                      chapterId: chapterId
                    }
                  });

                case 11:
                  _context2.t0 = _context2.sent;
                  return _context2.abrupt("return", {
                    liked: false,
                    count: _context2.t0
                  });

                case 13:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function resolve(_x4, _x5, _x6) {
          return _resolve2.apply(this, arguments);
        }

        return resolve;
      }()
    }
  }
};
exports.default = _default;