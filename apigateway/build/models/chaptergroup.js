"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var utils = _interopRequireWildcard(require("../utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var GroupTypes = ['STORY', 'ABOUT_ME', 'LESSON'];

module.exports = function (sequelize, DataTypes) {
  var ChapterGroup = sequelize.define('ChapterGroup', {
    type: {
      type: DataTypes.STRING,
      defaultValue: 'STORY',
      isIn: [GroupTypes]
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNul: false
    },
    chapterListOrder: {
      type: DataTypes.JSONB,
      defaultValue: []
    }
  }, {
    indexes: [{
      fields: ['userId', 'type']
    }]
  });

  ChapterGroup.associate = function (models) {
    ChapterGroup.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    ChapterGroup.hasMany(models.Chapter, {
      foreignKey: 'chapterGroupId',
      as: 'chapters'
    });
  };

  ChapterGroup.createDefaultGroups =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(userId) {
      var groups, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, group, chapterGroupId, chapter;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return ChapterGroup.bulkCreate(GroupTypes.map(function (type) {
                return {
                  type: type,
                  userId: userId
                };
              }), {
                returning: true
              });

            case 2:
              groups = _context.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 6;
              _iterator = groups[Symbol.iterator]();

            case 8:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 19;
                break;
              }

              group = _step.value;
              chapterGroupId = group.id;
              _context.next = 13;
              return sequelize.models.Chapter.create({
                chapterGroupId: chapterGroupId,
                userId: userId
              });

            case 13:
              chapter = _context.sent;
              _context.next = 16;
              return group.update({
                chapterListOrder: [chapter.id]
              });

            case 16:
              _iteratorNormalCompletion = true;
              _context.next = 8;
              break;

            case 19:
              _context.next = 25;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](6);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 25:
              _context.prev = 25;
              _context.prev = 26;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 28:
              _context.prev = 28;

              if (!_didIteratorError) {
                _context.next = 31;
                break;
              }

              throw _iteratorError;

            case 31:
              return _context.finish(28);

            case 32:
              return _context.finish(25);

            case 33:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[6, 21, 25, 33], [26,, 28, 32]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  ChapterGroup.createNewChapter =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(chapterGroup) {
      var chapterGroupId, userId, chapterListOrder, chapter, updatedGroup;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              chapterGroupId = chapterGroup.id, userId = chapterGroup.userId, chapterListOrder = chapterGroup.chapterListOrder;
              _context2.next = 3;
              return sequelize.models.Chapter.create({
                chapterGroupId: chapterGroupId,
                userId: userId
              });

            case 3:
              chapter = _context2.sent;
              _context2.next = 6;
              return chapterGroup.update({
                chapterListOrder: [].concat(_toConsumableArray(chapterListOrder), [chapter.id])
              });

            case 6:
              updatedGroup = _context2.sent;
              return _context2.abrupt("return", {
                group: updatedGroup,
                chapter: chapter
              });

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  ChapterGroup.deleteChapter =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(chapterGroup, chapter) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return sequelize.models.Chapter.destroy({
                where: {
                  id: chapter.id
                }
              });

            case 2:
              return _context3.abrupt("return", chapterGroup.update({
                chapterListOrder: chapterGroup.chapterListOrder.filter(function (id) {
                  return id !== chapter.id;
                })
              }));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  ChapterGroup.reorderChapters =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(chapterGroup, newOrder) {
      var chapterListOrder;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              chapterListOrder = chapterGroup.chapterListOrder;
              newOrder = newOrder.map(function (i) {
                return Number(i);
              });

              if (utils.hasSameElements(chapterListOrder, newOrder)) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt("return", chapterGroup);

            case 4:
              return _context4.abrupt("return", chapterGroup.update({
                chapterListOrder: newOrder
              }));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();

  return ChapterGroup;
};