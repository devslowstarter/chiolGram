const UserRepository = require('../repository/userRepository');
const ApiError = require('../apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserService {
  userRepository = new UserRepository();

  // 회원가입 API
  signupUser = async (loginId, password, passwordConfirm, nickname) => {
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

    const isExistUser = await this.userRepository.findOne(loginId);
    if (isExistUser) {
      throw new ApiError('중복된 아이디 입니다.', 409);
    }

    //암호화
    const hashPassword = await bcrypt.hash(password, 6);
    await this.userRepository.signupUser(loginId, hashPassword, passwordConfirm, nickname);
  };

  // 로그인 API
  loginUser = async (loginId, password) => {
    const user = await this.userRepository.findOne(loginId);
    if (!user) {
      throw new ApiError('닉네임 또는 패스워드를 확인해주세요.', 412);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ApiError('닉네임 또는 패스워드를 확인해주세요.', 412);
    }

    const loginToken = jwt.sign({ userId: user.userId }, process.env.CUSTOMIZED_SECRET_KEY, {
      expiresIn: '60m',
    });

    return { loginToken };
  };

  // 사용자 정보 조회 API
  getUser = async (userId) => {
    try {
      const user = await this.userRepository.findOne(userId);
      if (!user) {
        throw new ApiError('사용자를 찾을 수 없습니다.', 404);
      }
      return user;
    } catch (error) {
      console.log('error : ', error);
      throw new ApiError('사용자 정보를 가져오는 중에 오류가 발생했습니다.', 500);
    }
  };

  updateUser = async (userId, updateValues) => {
    return this.userRepository.updateUser(userId, updateValues);
  };

  deleteUser = async (userId, deleteValues) => {
    return this.userRepository.deleteUser(userId, deleteValues);
  };
}

module.exports = UserService;
