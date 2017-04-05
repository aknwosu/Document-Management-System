'use strict';

module.exports = function (sequelize, DataTypes) {
  var Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: {
        isIn: [['private', 'public', 'role']]
      }
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
        Documents.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Documents;
};