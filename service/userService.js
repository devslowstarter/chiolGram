const UserRepository = require('../repository/userRepository');
// const ApiError = require('../apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserService {
  userRepository = new UserRepository();

  // 회원가입
  signupUser = async (loginId, password, nickname) => {
    const idReg = /^[a-zA-Z0-9]{3,}$/; //loginId 형식검사
    const passwordReg = /^.{4,}$/; //password 형식 검사
    if (!idReg.test(loginId)) {
      throw new ApiError('아이디 형식이 일치하지 않습니다.', 410);
    }
    if (!passwordReg.test(password)) {
      throw new ApiError('패스워드 형식이 일치하지 않습니다.', 411);
    }
    if (password.includes(loginId)) {
      throw new ApiError('패스워드에 아이디가 포함되어 있습니다.', 413);
    }

    const isExistUser = await this.userRepository.findUser(loginId);
    if (isExistUser) {
      throw new ApiError('중복된 아이디 입니다.', 409);
    }

    //암호화
    const hashPassword = await bcrypt.hash(password, 6);
    await this.userRepository.createUser(loginId, hashPassword, nickname);
  };

  // 로그인
  loginUser = async (loginId, password) => {
    const findUserData = await this.userRepository.findOneUser({
      loginId,
      password,
    });

    if (!findUserData) {
      return {
        status: 412,
        message: '닉네임과 패스워드를 다시 확인해주세요.',
      };
    }

    const token = jwt.sign({ userId: findUserData.userId }, secretKey.key);

    return {
      status: 200,
      message: '로그인 되었습니다.',
      token,
    };
  };
}

module.exports = UserService;
