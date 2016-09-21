'use strict';
module.exports = function (sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    reply: DataTypes.TEXT,
    writer: DataTypes.TEXT,
    messageId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        models.comment.belongsTo(models.message);
      }
    }
  });
  return comment;
};
