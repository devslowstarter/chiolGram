const { Users } = require('../models');

class UserRepository {
  // loginId로 회원 조회
  findOne = async (loginId) => {
    const user = await Users.findOne({ where: { loginId } });
    return user;
  };
  // 회원가입 API
  signupUser = async (loginId, hashPassword, passwordConfirm, nickname) => {
    await Users.create({ loginId, password: hashPassword, passwordConfirm, nickname });
  };
  // 로그인 API
  loginUser = async (loginId, password) => {
    const user = await Users.findOne({ where: { loginId } });
    if (!user) {
      return null; // 사용자가 존재하지 않음
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null; // 비밀번호가 일치하지 않음
    }

    return user;
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
