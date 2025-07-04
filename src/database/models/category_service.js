'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category_service extends Model {
   
    static associate(models) {
      category_service.belongsTo(models.category, {
        foreignKey : "category_id", 
      });
      category_service.hasMany(models.category_service_price, {
        foreignKey : "category_service_id", 
      })
    }
  }
  category_service.init({
    category_id: {type : DataTypes.INTEGER, allowNull:false},
    service_name: {type : DataTypes.STRING, allowNull:false},
    type: {type: DataTypes.ENUM("normal", "vip"), allowNull:false}
  }, {
    sequelize,
    modelName: 'category_service',
    tableName: 'category_service'
  });
  return category_service;
};