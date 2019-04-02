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
    view: function () {
      var _view2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(chapter, args, _ref3) {
        var models, anonymousView;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                models = _ref3.models;
                _context3.next = 3;
                return models.AnonymousView.findOne({
                  where: {
                    chapterId: chapter.id
                  }
                });

              case 3:
                anonymousView = _context3.sent;
                _context3.t0 = anonymousView ? anonymousView.count : 0;
                _context3.next = 7;
                return models.ChapterView.count({
                  where: {
                    chapterId: chapter.id
                  }
                });

              case 7:
                _context3.t1 = _context3.sent;
                return _context3.abrupt("return", {
                  anonymousCount: _context3.t0,
                  count: _context3.t1
                });

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function view(_x7, _x8, _x9) {
        return _view2.apply(this, arguments);
      }

      return view;
    }(),
    like: function () {
      var _like2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(chapter, args, _ref4) {
        var models;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                models = _ref4.models;
                _context4.next = 3;
                return models.ChapterLike.count({
                  where: {
                    chapterId: chapter.id
                  }
                });

              case 3:
                _context4.t0 = _context4.sent;
                return _context4.abrupt("return", {
                  count: _context4.t0
                });

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function like(_x10, _x11, _x12) {
        return _like2.apply(this, arguments);
      }

      return like;
    }(),
    imageTheme: function imageTheme(chapter, args, _ref5) {
      var models = _ref5.models;
      return MockImage;
    },
    type: function () {
      var _type = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(chapter, args, _ref6) {
        var models, chapterGroup;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                models = _ref6.models;
                _context5.next = 3;
                return chapter.getChapterGroup();

              case 3:
                chapterGroup = _context5.sent;
                return _context5.abrupt("return", chapterGroup.type);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function type(_x13, _x14, _x15) {
        return _type.apply(this, arguments);
      }

      return type;
    }(),
    isAuthor: function () {
      var _isAuthor = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(chapter, args, _ref7) {
        var models, user;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                models = _ref7.models, user = _ref7.user;

                if (!(!user || chapter.userId !== user.id)) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", false);

              case 3:
                return _context6.abrupt("return", true);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function isAuthor(_x16, _x17, _x18) {
        return _isAuthor.apply(this, arguments);
      }

      return isAuthor;
    }(),
    author: function () {
      var _author = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(chapter, args, _ref8) {
        var models;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                models = _ref8.models;
                return _context7.abrupt("return", models.User.findOne({
                  where: {
                    id: chapter.userId
                  }
                }));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function author(_x19, _x20, _x21) {
        return _author.apply(this, arguments);
      }

      return author;
    }()
  },
  Query: {
    chapter: function () {
      var _chapter = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(root, _ref9, _ref10) {
        var chapterId, models, user;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                chapterId = _ref9.chapterId;
                models = _ref10.models, user = _ref10.user;
                _context8.prev = 2;
                return _context8.abrupt("return", models.Chapter.findOne({
                  where: {
                    id: chapterId
                  }
                }));

              case 6:
                _context8.prev = 6;
                _context8.t0 = _context8["catch"](2);
                throw _context8.t0;

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[2, 6]]);
      }));

      function chapter(_x22, _x23, _x24) {
        return _chapter.apply(this, arguments);
      }

      return chapter;
    }(),
    chapterViewerInfo: function () {
      var _chapterViewerInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(root, _ref11, _ref12) {
        var chapterId, models, user, liked;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                chapterId = _ref11.chapterId;
                models = _ref12.models, user = _ref12.user;

                if (user) {
                  _context9.next = 4;
                  break;
                }

                return _context9.abrupt("return", {
                  liked: false
                });

              case 4:
                _context9.next = 6;
                return models.ChapterLike.findOne({
                  where: {
                    chapterId: chapterId,
                    userId: user.id
                  }
                });

              case 6:
                liked = !!_context9.sent;
                return _context9.abrupt("return", {
                  liked: liked
                });

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function chapterViewerInfo(_x25, _x26, _x27) {
        return _chapterViewerInfo.apply(this, arguments);
      }

      return chapterViewerInfo;
    }(),
    allChapters: function () {
      var _allChapters = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(root, _ref13, _ref14) {
        var limit, cursor, userId, models, chapterList;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                limit = _ref13.limit, cursor = _ref13.cursor, userId = _ref13.userId;
                models = _ref14.models;
                _context10.prev = 2;

                if (!userId) {
                  _context10.next = 9;
                  break;
                }

                _context10.next = 6;
                return models.Chapter.getByUserId(userId);

              case 6:
                chapterList = _context10.sent;
                _context10.next = 12;
                break;

              case 9:
                _context10.next = 11;
                return models.Chapter.get({
                  limit: limit,
                  cursor: cursor
                });

              case 11:
                chapterList = _context10.sent;

              case 12:
                return _context10.abrupt("return", {
                  edges: chapterList.map(function (chapter) {
                    return {
                      cursor: chapter.updatedAt,
                      node: chapter
                    };
                  })
                });

              case 15:
                _context10.prev = 15;
                _context10.t0 = _context10["catch"](2);
                console.log(_context10.t0);
                throw _context10.t0;

              case 19:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[2, 15]]);
      }));

      function allChapters(_x28, _x29, _x30) {
        return _allChapters.apply(this, arguments);
      }

      return allChapters;
    }()
  },
  Mutation: {
    updateChapterContent: {
      authentication: true,
      resolve: function () {
        var _resolve = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee11(root, _ref15, _ref16) {
          var id, title, body, models, user, chapter;
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  id = _ref15.id, title = _ref15.title, body = _ref15.body;
                  models = _ref16.models, user = _ref16.user;

                  if (user) {
                    _context11.next = 4;
                    break;
                  }

                  throw new Error('Anauthenticated');

                case 4:
                  _context11.next = 6;
                  return models.Chapter.findOne({
                    where: {
                      id: id,
                      userId: user.id
                    }
                  });

                case 6:
                  chapter = _context11.sent;

                  if (chapter) {
                    _context11.next = 9;
                    break;
                  }

                  throw new Error('Chatper not found');

                case 9:
                  return _context11.abrupt("return", chapter.update({
                    title: title || chapter.title,
                    body: body || chapter.body
                  }));

                case 10:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee11, this);
        }));

        function resolve(_x31, _x32, _x33) {
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
        regeneratorRuntime.mark(function _callee12(root, _ref17, _ref18) {
          var storyId, chapterId, file, models, user, _ref19, stream, filename, mimetype, encoding;

          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  storyId = _ref17.storyId, chapterId = _ref17.chapterId, file = _ref17.file;
                  models = _ref18.models, user = _ref18.user;
                  _context12.prev = 2;
                  _context12.next = 5;
                  return file;

                case 5:
                  _ref19 = _context12.sent;
                  stream = _ref19.stream;
                  filename = _ref19.filename;
                  mimetype = _ref19.mimetype;
                  encoding = _ref19.encoding;
                  return _context12.abrupt("return", MockImage);

                case 13:
                  _context12.prev = 13;
                  _context12.t0 = _context12["catch"](2);
                  return _context12.abrupt("return", MockImage);

                case 16:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee12, this, [[2, 13]]);
        }));

        function resolve(_x34, _x35, _x36) {
          return _resolve2.apply(this, arguments);
        }

        return resolve;
      }()
    }
  }
};
exports.default = _default;