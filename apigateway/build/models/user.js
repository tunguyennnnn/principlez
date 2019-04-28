'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      notNull: true
    },
    locationId: {
      type: DataTypes.INTEGER
    },
    yearOfBirth: {
      type: DataTypes.STRING,
      is: ['^[1-9]{4}$', 'i']
    },
    fullname: {
      type: DataTypes.STRING,
      len: [4]
    },
    imageId: {
      type: DataTypes.INTEGER
    },
    blurb: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    occupation: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['email']
    }, {
      fields: ['fullname']
    }]
  });

  User.associate = function (models) {
    User.belongsTo(models.Location, {
      foreignKey: 'locationId',
      as: 'location'
    });
    User.belongsTo(models.ProfileImage, {
      foreignKey: 'imageId',
      as: 'profileImage'
    });
  };

  User.search =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(name) {
      var searchTerm;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              searchTerm = "%".concat(name, "%");
              return _context.abrupt("return", User.findAll({
                where: {
                  $or: [{
                    fullname: {
                      $like: searchTerm
                    }
                  }, {
                    email: {
                      $like: searchTerm
                    }
                  }]
                },
                limit: 10
              }));

            case 2:
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

  return User;
};