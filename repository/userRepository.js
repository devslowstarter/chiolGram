const { Users } = require('../models');

class UserRepository {
  // loginId로 회원 조회
  findUser = async (loginId) => {
    return await Users.findOne({ where: { loginId } });
  };
  // 회원가입 API
  createUser = async (loginId, hashPassword, nickname) => {
    await Users.create({ loginId, password: hashPassword, nickname });
  };
  //회원 정보 수정 API
  updateUser = async (userId, hashPassword, nickname) => {
    const updateValues = {};
    if (hashPassword) updateValues.password = hashPassword;
    if (nickname) updateValues.nickname = nickname;

    await Users.update(updateValues, { where: { userId } });
  };
  //회원 탈퇴 API
  deleteUser = async (userId) => {
    await Users.destroy({ where: { UserId: userId } });
  };
}

module.exports = UserRepository;
