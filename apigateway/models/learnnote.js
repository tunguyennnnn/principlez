'use strict';
module.exports = (sequelize, DataTypes) => {
  const LearnNote = sequelize.define(
    'LearnNote',
    {
      body: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      itemToLearnId: DataTypes.INTEGER,
    },
    {},
  );
  LearnNote.associate = models => {
    LearnNote.belongsTo(models.ItemToLearn, {
      foreignKey: 'itemToLearnId',
      as: 'itemToLearn',
    });
  };
  return LearnNote;
};
