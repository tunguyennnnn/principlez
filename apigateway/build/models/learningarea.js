'use strict';

module.exports = function (sequelize, DataTypes) {
  var LearningArea = sequelize.define('LearningArea', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    settings: DataTypes.JSONB
  }, {
    indexes: [{
      fields: ['name']
    }]
  });

  LearningArea.associate = function (models) {
    LearningArea.hasMany(models.ItemToLearn, {
      foreignKey: 'learningAreaId',
      as: 'items'
    });
    LearningArea.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return LearningArea;
};