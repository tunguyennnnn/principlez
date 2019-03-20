"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Mutation: {
    viewChapter: {
      resolve: function () {
        var _resolve = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(root, _ref, _ref2) {
          var chapterId, models, user, chapter;
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

                  throw new Error("Not found resource");

                case 7:
                  if (user) {
                    _context.next = 11;
                    break;
                  }

                  _context.next = 10;
                  return models.ChapterView.addAnonymousView(chapterId);

                case 10:
                  return _context.abrupt("return", true);

                case 11:
                  if (!(chapter.userId === user.id)) {
                    _context.next = 13;
                    break;
                  }

                  return _context.abrupt("return", true);

                case 13:
                  _context.next = 15;
                  return models.ChapterView.addViewer(chapterId, user.id);

                case 15:
                  return _context.abrupt("return", true);

                case 16:
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
    }
  }
};
exports.default = _default;