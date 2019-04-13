'use strict';

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

  return User;
};