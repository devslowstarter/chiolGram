const { Users } = require('../models');

class UserRepository {
  // 회원가입
  signupUser = async (signupData) => await Users.create(signupData);

  // DB에서 User 찾기
  findOneUser = async (findOption) => await Users.findOne({ where: findOption });
}

module.exports = UserRepository;
