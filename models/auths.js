'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auths extends Model {
    static associate(models) {
      // Users와 Auths는 일대다 관계
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'authId',
      });

      // Boards와 Auths는 일대다 관계
      this.belongsTo(models.Boards, {
        targetKey: 'boardId',
        foreignKey: 'boardId',
      });
    }
  }
  Auths.init({
    authId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    boardId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Auths',
  });
  return Auths;
};