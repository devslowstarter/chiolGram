'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cmts extends Model {
    static associate(models) {
      // Users와 Cmts는 다대일 관계
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
      // Boards와 Cmts는 다대일 관계
      this.belongsTo(models.Boards, {
        sourceKey: 'cmtId',
        foreignKey: 'boardId',
      });
      // Cmts와 Likes는 일대다 관계
      this.hasMany(models.Likes, {
        sourceKey: 'cmtId',
        foreignKey: 'cmtId',
      });
      // this.belongsToMany(models.Users, {
      //   as: 'boardike',
      //   through: 'Likes',
      //   foreignKey: 'userId',
      //   otherKey: 'boardId',
      // });
    }
  }
  Cmts.init(
    {
      cmtId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      boardId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      content: {
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
    },
    {
      sequelize,
      modelName: 'Cmts',
    }
  );
  return Cmts;
};