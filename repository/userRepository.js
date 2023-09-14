const { Users } = require('../models');

class UserRepository {
  // loginId로 회원 조회
  findOne = async (loginId) => {
    return await Users.findOne({ where: { loginId } });
  };
  // 회원가입 API
  signupUser = async (loginId, hashPassword, passwordConfirm, nickname) => {
    await Users.create({ loginId, password: hashPassword, passwordConfirm, nickname });
  };
  //회원 정보 수정 API
  updateUser = async (nickname, userId, hashPassword) => {
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
