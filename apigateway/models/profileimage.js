'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProfileImage = sequelize.define(
    'ProfileImage',
    {
      thumb: {
        type: DataTypes.STRING,
        isUrl: true,
      },
      medium: {
        type: DataTypes.STRING,
        isUrl: true,
      },
      large: {
        type: DataTypes.STRING,
        isUrl: true,
      },
      source: {
        type: DataTypes.STRING,
        isUrl: true,
      },
    },
    {},
  );
  ProfileImage.associate = function(models) {
    ProfileImage.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return ProfileImage;
};
