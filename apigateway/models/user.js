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
    },
    {
      indexes: [
        {
          fields: ['fullname'],
        },
      ],
    },
  );
  User.associate = models => {};
  return User;
};
