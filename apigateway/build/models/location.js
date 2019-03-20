'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = function (sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    country: {
      type: DataTypes.STRING,
      is: ['^[a-zA-Z0-9_ ]+$', 'i']
    },
    city: {
      type: DataTypes.STRING,
      is: ['^[a-zA-Z0-9_ ]+$', 'i']
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['country', 'city']
    }]
  });

  Location.associate = function (models) {
    Location.hasMany(models.User, {
      foreignKey: 'locationId',
      as: 'users'
    });
  };

  Location.findOneOrCreate =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var country, city, _ref3, _ref4, location;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              country = _ref.country, city = _ref.city;
              _context.next = 3;
              return Location.findOrCreate({
                where: {
                  country: country,
                  city: city
                }
              });

            case 3:
              _ref3 = _context.sent;
              _ref4 = _slicedToArray(_ref3, 1);
              location = _ref4[0];
              return _context.abrupt("return", location);

            case 7:
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

  return Location;
};