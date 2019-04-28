'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = function (sequelize, DataTypes) {
  var Chapter = sequelize.define('Chapter', {
    userId: {
      type: DataTypes.INTEGER,
      allowNul: false
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    body: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'STORY'
    },
    chapterGroupId: {
      type: DataTypes.INTEGER,
      allowNul: false
    },
    imageId: DataTypes.INTEGER
  }, {
    indexes: [{
      fields: ['title']
    }, {
      fields: ['userId']
    }]
  });

  Chapter.associate = function (models) {
    Chapter.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'chapter'
    });
    Chapter.belongsTo(models.ChapterGroup, {
      foreignKey: 'chapterGroupId',
      as: 'chapterGroup'
    });
    Chapter.belongsTo(models.ProfileImage, {
      foreignKey: 'imageId',
      as: 'profileImage'
    });
    Chapter.hasMany(models.ChapterLike, {
      foreignKey: 'chapterId',
      as: 'likes'
    });
  };

  Chapter.get =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var _ref$type, type, _ref$limit, limit, cursor, options;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref$type = _ref.type, type = _ref$type === void 0 ? 'STORIES' : _ref$type, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 20 : _ref$limit, cursor = _ref.cursor;
              options = {
                where: {},
                order: [['updatedAt', 'DESC']],
                limit: limit
              };

              if (cursor) {
                options.where.updatedAt = {
                  $lt: cursor
                };
              }

              return _context.abrupt("return", Chapter.findAll(options));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  Chapter.getByUserId =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(userId) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", Chapter.findAll({
                where: {
                  userId: userId
                }
              }));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  Chapter.search =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(text) {
      var chapters;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Chapter.findAll({
                where: {
                  title: {
                    $iLike: "%".concat(text, "%")
                  }
                },
                limit: 10,
                attributes: ['id', 'title', 'body']
              });

            case 2:
              chapters = _context3.sent;
              return _context3.abrupt("return", chapters.map(function (chapter) {
                var id = chapter.id,
                    title = chapter.title,
                    body = chapter.body;
                return {
                  id: id,
                  title: title,
                  body: body.length === 0 ? body : [body[0]]
                };
              }));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  return Chapter;
};