'use strict';

var bcrypt = require('bcrypt-nodejs');
module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 6 }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
        Users.belongsTo(models.Roles, {
          onDelete: 'CASCADE',
          foreignKey: 'roleId'
        });
        Users.hasMany(models.Documents, {
          onDelete: 'CASCADE',
          foreignKey: 'userId'
        });
      }
    },

    instanceMethods: {
      /**
       * Compare plain password to hashed one
       * @method
       * @param {String} password
       * @returns {Boolean} password match
       */
      validPassword: function validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },


      /**
       * Hash password received from user
       * @method
       * @returns {void}
       */
      hashPassword: function hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(9));
      }
    },
    hooks: {
      beforeCreate: function beforeCreate(user) {
        user.hashPassword();
      },
      beforeUpdate: function beforeUpdate(user) {
        user.hashPassword();
      }
    }
  });
  return Users;
};