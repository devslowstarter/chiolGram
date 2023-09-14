const UserService = require('../service/userService.js');

class userController {
  userService = new UserService();

  // 회원가입
  signupUser = async (req, res) => {
    const { loginId, password, passwordConfirm, nickname } = req.body;

    try {
      if (!loginId || !password || !nickname) {
        return res.status(412).json({ message: '입력되지 않은 정보가 있습니다.' });
      }
      if (password !== passwordConfirm) {
        return res.status(412).json({ message: '패스워드가 일치하지 않습니다.' });
      }

      await this.userService.signupUser(loginId, password, passwordConfirm, nickname);

      return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  // 로그인
  loginUser = async (req, res) => {
    const { loginId, password } = req.body;

    try {
      if (!loginId || !password) {
        return res.status(412).json({ message: '입력되지 않은 정보가 있습니다.' });
      }

      const { loginToken } = await this.userService.loginUser(loginId, password);

      res.cookie('Authorization', `Bearer ${loginToken}`);
      return res.status(200).json({ message: '로그인에 성공하였습니다.', loginToken });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  //회원 정보 조회 API [GET]
  getUser = async (req, res) => {
    const userId = res.locals.user.userId;
    const loginId = req.params.loginId;

    try {
      if (!userId) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }

      console.log('userService:', this.userService);
      const user = await this.userService.findOne(loginId);

      if (!user) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }

      // 사용자 정보에서 비밀번호를 삭제
      delete user.password;

      return res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };

  //회원 정보 수정 API [PUT]
  updateUser = async (req, res) => {
    const { userId, password } = res.locals.user;
    const { existPassword, newPassword, newPasswordConfirm, nickname } = req.body;

    try {
      if (newPassword !== newPasswordConfirm) {
        return res.status(412).json({ message: '새로운 비밀번호가 일치하지 않습니다.' });
      }

      await this.userService.updateUser(userId, password, existPassword, newPassword, nickname);

      return res.status(200).json({ message: '프로필을 수정하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  //회원 탈퇴 API [DELETE]
  deleteUser = async (req, res) => {
    const { userId, password } = res.locals.user;
    // const { existPassword } = req.body;

    // console.log(existPassword);
    try {
      // if (!existPassword) {
      //   return res.status(412).json({ errorMessage: '입력되지 않은 정보가 있습니다.' });
      // }

      await this.userService.deleteUser(userId, password);

      return res.status(200).json({ message: '회원 탈퇴 완료하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
}

module.exports = userController;
