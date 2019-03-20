'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = function (sequelize, DataTypes) {
  var ChapterView = sequelize.define('ChapterView', {
    chapterId: {
      type: DataTypes.INTEGER,
      allowNul: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNul: true
    }
  }, {
    indexes: [{
      fields: ['chapterId']
    }, {
      fields: ['chapterId', 'userId']
    }]
  });

  ChapterView.associate = function (models) {
    ChapterView.belongsTo(models.Chapter, {
      foreignKey: 'chapterId',
      as: 'chapter'
    });
    ChapterView.belongsTo(models.User, {
      foreignKey: 'chapterId',
      as: 'user'
    });
  };

  ChapterView.addAnonymousView =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(chapterId) {
      var _ref2, _ref3, view;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return sequelize.models.AnonymousView.findOrCreate({
                where: {
                  chapterId: chapterId
                }
              });

            case 2:
              _ref2 = _context.sent;
              _ref3 = _slicedToArray(_ref2, 1);
              view = _ref3[0];
              return _context.abrupt("return", view.update({
                count: view.count + 1
              }));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  ChapterView.addViewer =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(chapterId, userId) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", ChapterView.findOrCreate({
                where: {
                  chapterId: chapterId,
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

    return function (_x2, _x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  return ChapterView;
};