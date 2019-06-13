'use strict';

module.exports = function (sequelize, DataTypes) {
  var LearnNote = sequelize.define('LearnNote', {
    body: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    itemToLearnId: DataTypes.INTEGER
  }, {});

  LearnNote.associate = function (models) {
    LearnNote.belongsTo(models.ItemToLearn, {
      foreignKey: 'itemToLearnId',
      as: 'itemToLearn'
    });
  };

  return LearnNote;
};