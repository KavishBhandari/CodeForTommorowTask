'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category_service_price extends Model {
    
    static associate(models) {
      category_service_price.belongsTo(models.category_service, {
        foreignKey : "category_service_id", 
      })
    }
  }
  category_service_price.init({
    category_service_id:{type : DataTypes.INTEGER, allowNull:false},
    duration: {type : DataTypes.STRING, allowNull:false},
    price: {type : DataTypes.DOUBLE, allowNull:false},
    type:{ type : DataTypes.ENUM("hourly, weekly, monthly"), allowNull:false}
  }, {
    sequelize,
    modelName: 'category_service_price',
    tableName: 'category_service_price',
  });
  return category_service_price;
};