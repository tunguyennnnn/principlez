'use strict';
module.exports = (sequelize, DataTypes) => {
  const ItemToLearn = sequelize.define(
    'ItemToLearn',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      source: DataTypes.STRING,
      learningAreaId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      indexes: [
        {
          fields: ['name'],
        },
      ],
    },
  );
  ItemToLearn.associate = models => {
    ItemToLearn.belongsTo(models.LearningArea, {
      foreignKey: 'learningAreaId',
      as: 'learningArea',
    });

    ItemToLearn.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return ItemToLearn;
};
