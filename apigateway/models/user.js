'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        notNull: true,
      },
      locationId: {
        type: DataTypes.INTEGER,
      },
      yearOfBirth: {
        type: DataTypes.STRING,
        is: ['^[1-9]{4}$', 'i'],
      },
      fullname: {
        type: DataTypes.STRING,
        len: [4],
      },
      imageId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
        {
          fields: ['fullname'],
        },
      ],
    },
  );

  User.associate = models => {
    User.belongsTo(models.Location, {
      foreignKey: 'locationId',
      as: 'location',
    });

    User.belongsTo(models.ProfileImage, {
      foreignKey: 'imageId',
      as: 'profileImage',
    });
  };
  return User;
};
