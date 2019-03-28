import _ from 'lodash';
import * as utils from '../utils';

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
    const storyGroup = await ChapterGroup.create({
      type: 'STORY',
      userId,
    });

    const storyChapter = await sequelize.models.Chapter.create({
      chapterGroupId: storyGroup.id,
      userId,
      type: 'STORY',
    });
    await storyGroup.update({ chapterListOrder: [storyChapter.id] });
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

  ChapterGroup.deleteChapter = async (chapterGroup, chapter) => {
    await sequelize.models.Chapter.destroy({ where: { id: chapter.id } });

    return chapterGroup.update({
      chapterListOrder: chapterGroup.chapterListOrder.filter(
        id => id !== chapter.id,
      ),
    });
  };

  ChapterGroup.reorderChapters = async (chapterGroup, newOrder) => {
    const { chapterListOrder } = chapterGroup;
    newOrder = newOrder.map(i => Number(i));

    if (!utils.hasSameElements(chapterListOrder, newOrder)) {
      return chapterGroup;
    }

    return chapterGroup.update({ chapterListOrder: newOrder });
  };
  return ChapterGroup;
};
