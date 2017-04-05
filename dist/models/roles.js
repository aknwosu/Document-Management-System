'use strict';

module.exports = function (sequelize, DataTypes) {
  var Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
        Roles.hasMany(models.Users, {
          onDelete: 'CASCADE',
          foreignKey: 'roleId'
        });
      }
    }
  });
  return Roles;
};