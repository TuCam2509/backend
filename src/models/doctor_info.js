'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor_info.belongsTo(models.User,{foreignKey:'doctorId'}) 
      Doctor_info.belongsTo(models.Allcode,{foreignKey:'priceId',targetKey:'keyMap',as:'priceTypeData'})
      Doctor_info.belongsTo(models.Allcode,{foreignKey:'paymentId',targetKey:'keyMap',as:'payTypeData'})
      Doctor_info.belongsTo(models.Allcode,{foreignKey:'provienceId',targetKey:'keyMap',as:'proTypeData'})
      
    }
  };
 Doctor_info.init({
    doctorId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    priceId:DataTypes.STRING,
    provienceId:DataTypes.STRING,
    paymentId:DataTypes.STRING,
    addressClinic:DataTypes.STRING,
    nameClinic:DataTypes.STRING,
    note:DataTypes.STRING,
    count:DataTypes.INTEGER


  }, {
    sequelize,
    modelName: 'Doctor_info',
    freezeTableName:true
  });
  return Doctor_info;
};