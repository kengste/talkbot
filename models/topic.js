'use strict';
module.exports = function (sequelize, DataTypes) {
  var topic = sequelize.define('topic', {
    message: DataTypes.TEXT,
    ID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // models.topic.hasMany(models.message);
      }
    }
  });
  return topic;
};
