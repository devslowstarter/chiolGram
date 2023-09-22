'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // Users와 Boards는 일대다 관계
      this.hasMany(models.Boards, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      passwordConfirm: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    },
  );
  return Users;
};

class Users extends Model {
  static associate(models) {
    // Users와 Users 간 팔로우 관계 설정
    this.belongsToMany(models.Users, {
      // user 모델간의 팔로우 관계를 설정하는 것
      // 팔로워, 팔로잉 관계를 모두 설정하며, 두 관계 모두 belongsToMany 메서드를 사용하여 설정되어있음.

      foreignKey: 'followerId', // 외래키로 사용할 컬럼 설정
      as: 'Followers', // 관계를 나타내는 이름 설정
      through: 'follows', // 관계정보를 저장하는 테이블 이름 설정
    });

    this.belongsToMany(models.Users, {
      foreignKey: 'followingId',
      as: 'Followings',
      through: 'follows',
    });
  }
}
