'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define(
    'Chapter',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNul: false,
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      body: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      chapterGroupId: {
        type: DataTypes.INTEGER,
        allowNul: false,
      },
      imageId: DataTypes.INTEGER,
    },
    {
      indexes: [
        {
          fields: ['title'],
        },
        {
          fields: ['userId'],
        },
      ],
    },
  );
  Chapter.associate = function(models) {
    Chapter.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'chapter',
    });

    Chapter.belongsTo(models.ChapterGroup, {
      foreignKey: 'chapterGroupId',
      as: 'chapterGroup',
    });

    Chapter.belongsTo(models.ProfileImage, {
      foreignKey: 'imageId',
      as: 'profileImage',
    });

    Chapter.hasMany(models.ChapterLike, {
      foreignKey: 'chapterId',
      as: 'likes',
    });
  };

  Chapter.get = async ({ type = 'STORIES', limit = 20, cursor }) => {
    const options = { where: {}, order: [['updatedAt', 'DESC']], limit };
    if (cursor) {
      options.where.updatedAt = { $lt: cursor };
    }
    return Chapter.findAll(options);
  };
  return Chapter;
};
