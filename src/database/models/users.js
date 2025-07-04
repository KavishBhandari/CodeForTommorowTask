'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
    }
  }
  users.init({
    email: {type : DataTypes.STRING, allowNull:false},
    password: {type : DataTypes.STRING, allowNull:false},
    role: {type : DataTypes.ENUM("admin", "customer", "worker")},

  }, {
    sequelize,
    modelName: 'users',
    tableName: "users"
  });
  return users;
};