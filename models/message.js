'use strict';
module.exports = function (sequelize, DataTypes) {
  var message = sequelize.define('message', {
    msg: DataTypes.TEXT,
    user: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function (models) {
        models.message.hasMany(models.comment);
      }
    }
  });
  return message;
};
