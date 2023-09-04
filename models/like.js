'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    static associate(models) {
      // Users와 Likes는 일대다 관계
      this.belongsToMany(models.Users, {
        through: 'LikeUser',
        targetKey: 'userId',
        foreignKey: 'userId',
      });
      // Boards와 Likes는 일대다 관계
      this.belongsToMany(models.Boards, {
        through: 'LikeUser',
        sourceKey: 'likeId',
        foreignKey: 'boardId',
      });
      // Cmts와 Likes는 일대다 관계
      this.belongsToMany(models.Cmts, {
        through: 'LikeUser',
        sourceKey: 'likeId',
        foreignKey: 'cmtId',
      });
    }
  }
  Likes.init(
    {
      likeId: {
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
      cmtId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Likes',
    }
  );
  return Likes;
};