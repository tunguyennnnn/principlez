'use strict';

module.exports = function (sequelize, DataTypes) {
  var AnonymousView = sequelize.define('AnonymousView', {
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    chapterId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [{
      fields: ['chapterId']
    }]
  });

  AnonymousView.associate = function (models) {
    AnonymousView.belongsTo(models.Chapter, {
      foreignKey: 'chapterId',
      as: 'chapter'
    });
  };

  return AnonymousView;
};