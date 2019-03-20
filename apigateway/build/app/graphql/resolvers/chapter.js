"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var MockImage = {
  thumb: 'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg',
  medium: 'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg',
  large: 'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg'
};
var _default = {
  ChapterFace: {
    view: function () {
      var _view = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(chapter, args, _ref) {
        var models, anonymousView;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                models = _ref.models;
                _context.next = 3;
                return models.AnonymousView.findOne({
                  where: {
                    chapterId: chapter.id
                  }
                });

              case 3:
                anonymousView = _context.sent;
                _context.t0 = anonymousView ? anonymousView.count : 0;
                _context.next = 7;
                return models.ChapterView.count({
                  where: {
                    chapterId: chapter.id
                  }
                });

              case 7:
                _context.t1 = _context.sent;
                return _context.abrupt("return", {
                  anonymousCount: _context.t0,
                  count: _context.t1
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function view(_x, _x2, _x3) {
        return _view.apply(this, arguments);
      }

      return view;
    }(),
    like: function () {
      var _like = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(chapter, args, _ref2) {
        var models;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref2.models;
                _context2.next = 3;
                return models.ChapterLike.count({
                  where: {
                    chapterId: chapter.id
                  }
                });

              case 3:
                _context2.t0 = _context2.sent;
                return _context2.abrupt("return", {
                  count: _context2.t0
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function like(_x4, _x5, _x6) {
        return _like.apply(this, arguments);
      }

      return like;
    }()
  },
  Chapter: {
    imageTheme: function imageTheme(chapter, args, _ref3) {
      var models = _ref3.models;
      return MockImage;
    },
    type: function () {
      var _type = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(chapter, args, _ref4) {
        var models, chapterGroup;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                models = _ref4.models;
                _context3.next = 3;
                return chapter.getChapterGroup();

              case 3:
                chapterGroup = _context3.sent;
                return _context3.abrupt("return", chapterGroup.type);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function type(_x7, _x8, _x9) {
        return _type.apply(this, arguments);
      }

      return type;
    }(),
    isAuthor: function () {
      var _isAuthor = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(chapter, args, _ref5) {
        var models, user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                models = _ref5.models, user = _ref5.user;

                if (!(!user || chapter.userId !== user.id)) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", false);

              case 3:
                return _context4.abrupt("return", true);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function isAuthor(_x10, _x11, _x12) {
        return _isAuthor.apply(this, arguments);
      }

      return isAuthor;
    }()
  },
  Query: {
    chapter: function () {
      var _chapter = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(root, _ref6, _ref7) {
        var chapterId, models, user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                chapterId = _ref6.chapterId;
                models = _ref7.models, user = _ref7.user;
                _context5.prev = 2;
                return _context5.abrupt("return", models.Chapter.findOne({
                  where: {
                    id: chapterId
                  }
                }));

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](2);
                throw _context5.t0;

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 6]]);
      }));

      function chapter(_x13, _x14, _x15) {
        return _chapter.apply(this, arguments);
      }

      return chapter;
    }(),
    chapterViewerInfo: function () {
      var _chapterViewerInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(root, _ref8, _ref9) {
        var chapterId, models, user, liked;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                chapterId = _ref8.chapterId;
                models = _ref9.models, user = _ref9.user;

                if (user) {
                  _context6.next = 4;
                  break;
                }

                return _context6.abrupt("return", {
                  liked: false
                });

              case 4:
                _context6.next = 6;
                return models.ChapterLike.findOne({
                  where: {
                    chapterId: chapterId,
                    userId: user.id
                  }
                });

              case 6:
                liked = !!_context6.sent;
                return _context6.abrupt("return", {
                  liked: liked
                });

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function chapterViewerInfo(_x16, _x17, _x18) {
        return _chapterViewerInfo.apply(this, arguments);
      }

      return chapterViewerInfo;
    }()
  },
  Mutation: {
    updateChapterContent: {
      authentication: true,
      resolve: function () {
        var _resolve = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee7(root, _ref10, _ref11) {
          var id, title, body, models, user, chapter;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  id = _ref10.id, title = _ref10.title, body = _ref10.body;
                  models = _ref11.models, user = _ref11.user;

                  if (user) {
                    _context7.next = 4;
                    break;
                  }

                  throw new Error('Anauthenticated');

                case 4:
                  _context7.next = 6;
                  return models.Chapter.findOne({
                    where: {
                      id: id,
                      userId: user.id
                    }
                  });

                case 6:
                  chapter = _context7.sent;

                  if (chapter) {
                    _context7.next = 9;
                    break;
                  }

                  throw new Error('Chatper not found');

                case 9:
                  return _context7.abrupt("return", chapter.update({
                    title: title || chapter.title,
                    body: body || chapter.body
                  }));

                case 10:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function resolve(_x19, _x20, _x21) {
          return _resolve.apply(this, arguments);
        }

        return resolve;
      }()
    },
    uploadImageTheme: {
      authentication: true,
      resolve: function () {
        var _resolve2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee8(root, _ref12, _ref13) {
          var storyId, chapterId, file, models, user, _ref14, stream, filename, mimetype, encoding;

          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  storyId = _ref12.storyId, chapterId = _ref12.chapterId, file = _ref12.file;
                  models = _ref13.models, user = _ref13.user;
                  _context8.prev = 2;
                  _context8.next = 5;
                  return file;

                case 5:
                  _ref14 = _context8.sent;
                  stream = _ref14.stream;
                  filename = _ref14.filename;
                  mimetype = _ref14.mimetype;
                  encoding = _ref14.encoding;
                  return _context8.abrupt("return", MockImage);

                case 13:
                  _context8.prev = 13;
                  _context8.t0 = _context8["catch"](2);
                  return _context8.abrupt("return", MockImage);

                case 16:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this, [[2, 13]]);
        }));

        function resolve(_x22, _x23, _x24) {
          return _resolve2.apply(this, arguments);
        }

        return resolve;
      }()
    }
  }
};
exports.default = _default;