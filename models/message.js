'use strict';
module.exports = function (sequelize, DataTypes) {
  var message = sequelize.define('message', {
    ID: DataTypes.INTEGER,
    msg: DataTypes.TEXT,
    user: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function (models) {
        // models.message.belongsTo(models.topic);
        // models.message.belongsTo(models.user);
      }
    }
  });
  return message;
};
