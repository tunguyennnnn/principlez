'use strict';

const GroupTypes = ['STORY', 'ABOUT_ME', 'LESSON'];

module.exports = (sequelize, DataTypes) => {
  const ChapterGroup = sequelize.define(
    'ChapterGroup',
    {
      type: {
        type: DataTypes.STRING,
        defaultValue: 'STORY',
        isIn: [GroupTypes],
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
    {
      indexes: [
        {
          fields: ['userId', 'type'],
        },
      ],
    },
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

  ChapterGroup.createDefaultGroups = async userId => {
    const groups = await ChapterGroup.bulkCreate(
      GroupTypes.map(type => ({ type, userId })),
      { returning: true },
    );

    for (const group of groups) {
      const { id: chapterGroupId } = group;
      const chapter = await sequelize.models.Chapter.create({
        chapterGroupId,
        userId,
      });
      await group.update({ chapterListOrder: [chapter.id] });
    }
  };

  ChapterGroup.createNewChapter = async chapterGroup => {
    const { id: chapterGroupId, userId, chapterListOrder } = chapterGroup;
    const chapter = await sequelize.models.Chapter.create({
      chapterGroupId,
      userId,
    });
    const updatedGroup = await chapterGroup.update({
      chapterListOrder: [...chapterListOrder, chapter.id],
    });
    return { group: updatedGroup, chapter };
  };
  return ChapterGroup;
};
