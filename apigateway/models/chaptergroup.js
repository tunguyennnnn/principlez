'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChapterGroup = sequelize.define(
    'ChapterGroup',
    {
      type: {
        type: DataTypes.STRING,
        defaultValue: 'STORY',
        isIn: [['STORY', 'ABOUT_ME', 'LESSON']],
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNul: false,
      },
      chapterListOrder: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
    },
    {},
  );
  ChapterGroup.associate = function(models) {
    ChapterGroup.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    ChapterGroup.hasMany(models.Chapter, {
      foreignKey: 'chapterGroupId',
      as: 'chapters',
    });
  };
  return ChapterGroup;
};
