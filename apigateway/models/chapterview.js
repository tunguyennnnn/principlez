'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChapterView = sequelize.define(
    'ChapterView',
    {
      chapterId: {
        type: DataTypes.INTEGER,
        allowNul: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNul: true,
      },
    },
    {
      indexes: [
        {
          fields: ['chapterId'],
        },
        {
          fields: ['chapterId', 'userId'],
        },
      ],
    },
  );

  ChapterView.associate = models => {
    ChapterView.belongsTo(models.Chapter, {
      foreignKey: 'chapterId',
      as: 'chapter',
    });

    ChapterView.belongsTo(models.User, {
      foreignKey: 'chapterId',
      as: 'user',
    });
  };

  ChapterView.addAnonymousView = async chapterId => {
    const [view] = await sequelize.models.AnonymousView.findOrCreate({
      where: { chapterId },
    });

    return view.update({ count: view.count + 1 });
  };

  ChapterView.addViewer = async (chapterId, userId) => {
    return sequelize.models.ChapterView.findOrCreate({
      where: { chapterId, userId },
    });
  };

  return ChapterView;
};
