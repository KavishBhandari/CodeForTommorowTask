'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    
    static associate(models) {
      category.hasMany(models.category_service, {
        foreignKey : "category_id", 
      })
    }
  }
  category.init({
    category_name: {type : DataTypes.STRING, allowNull:false},
    deleted_at : {type : DataTypes.DATE, allowNull:true, defaultValue: null},
  }, {
    sequelize,
    modelName: 'category',
    tableName: 'category',
  });
  return category;
};