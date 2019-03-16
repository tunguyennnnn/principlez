'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChapterLike = sequelize.define(
    'ChapterLike',
    {
      chapterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      indexes: [{ fields: ['chapterId'] }, { fields: ['chapterId', 'userId'] }],
    },
  );
  ChapterLike.associate = models => {};

  ChapterLike.addLike = async (chapter, userId) => {
    return ChapterLike.findOrCreate({
      where: { chapterId, userId },
    });
  };
  return ChapterLike;
};
