const UserService = require('../service/userService.js');

class userController {
  userService = new UserService();

  // 회원가입
  signupUser = async (req, res) => {
    const { email, nickname, password, passwordConfirm } = req.body;
    const { status, message } = await this.userService.signupUser(
      email,
      nickname,
      password,
      passwordConfirm,
    );

    return res.status(status).json({ message });
  };

  // 로그인
  loginUser = async (req, res) => {
    const { nickname, password } = req.body;
    const { status, message, token } = await this.userService.doLogin(nickname, password);

    res.cookie('Authorization', `Bearer ${token}`);
    return res.status(status).json({ message });
  };
}

module.exports = userController;
