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
      blurb: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      occupation: {
        type: DataTypes.STRING,
        defaultValue: '',
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

  User.search = async name => {
    const searchTerm = `%${name}%`;
    return User.findAll({
      where: {
        $or: [
          { fullname: { $like: searchTerm } },
          { email: { $like: searchTerm } },
        ],
      },
      limit: 10,
    });
  };
  return User;
};
