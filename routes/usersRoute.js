const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller.js');
const userController = new usercontroller();

// 회원가입
router.post('/signup', userController.signupUser);

// 팔로워 생성
router.post('/', async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const follower = await Users.findByPk(followerId);
    const following = await Users.findByPk(followingId);

    if (!follower || !following) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    const follow = await Follows.create({ followerId, followingId });

    res.status(201).json(follow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 팔로워 목록 조회
router.get('/', async (req, res) => {
  try {
    const followers = await Follows.findAll();
    res.json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 팔로워 삭제
router.delete('/:id', async (req, res) => {
  try {
    const followId = req.params.id;

    const follow = await Follows.findByPk(followId);

    if (!follow) {
      return res.status(404).json({ message: '팔로워를 찾을 수 없습니다.' });
    }

    await follow.destroy();

    res.json({ message: '팔로워 삭제 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

module.exports = router;
위에서 작성한 라우터를 Express 애플리케이션에서 사용하도록 설정합니다 (app.js 또는 서버 진입 파일):
javascript
Copy code
const express = require('express');
const app = express();
const followersRouter = require('./routes/followers'); // 라우터 경로에 따라 수정

// 미들웨어 및 기타 설정 추가

app.use('/followers', followersRouter); // /followers 경로로 팔로워 관련 라우터 사용

// 미들웨어 및 서버 시작 코드 추가

app.listen(3000, () => {
  console.log('서버가 3000 포트에서 실행 중입니다.');
});
이제 위의 코드를 참고하여 팔로워(Followers) 관련 CRUD 작업을 수행할 수 있는 라우터가 설정된 Express 애플리케이션이 준비되었습니다. 코드에서 필요에 따라 수정하고 나머지 설정을 완료하면 팔로워 관련 기능을 사용할 수 있을 것입니다.







/*
const express = require('express');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const router = express.Router();

require('dotenv').config();

// 1. 유저 회원 가입 API [POST]
router.post('/signup', async (req, res) => {
  console.log(req.body);
  const { email, nickname, password, passwordConfirm } = req.body;

  const validEmailCheck = (string) => {
    const pattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[A-Za-z]+$/;
    return pattern.test(string);
  };

  if (!validEmailCheck(email) || email.length < 3) {
    return res.status(400).json({ errorMessage: '이메일의 형식이 올바르지 않습니다.' });
  }

  if (!password || password < 4) {
    return res.status(412).json({ errorMessage: '패스워드는 4자이상이어야 합니다.' });
  }

  if (password !== passwordConfirm) {
    return res.status(412).json({
      errorMessage: '패스워드가 일치하지 않습니다. 패스워드 재입력은 passwordConfirm 입니다.',
    });
  }

  const isExistUser = await Users.findOne({ where: { email: email } });
  if (isExistUser) {
    return res.status(412).json({ errorMessage: '이미 존재하는 이메일입니다.' });
  }

  try {
    await Users.create({ email, nickname, password, passwordConfirm });
    return res.status(201).json({ message: '유저가 등록되었습니다.' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errorMessage: '유저 등록 과정에서 오류가 발생하였습니다.' });
  }
});

// 2. 유저 로그인 API [POST]
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const userCheck = await Users.findOne({
    where: { email: email },
  });

  if (!userCheck) {
    return res.status(401).json({ errorMessage: '해당하는 사용자가 존재하지 않습니다.' });
  } else if (userCheck.password !== password) {
    return res.status(401).json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
  }

  try {
    // JWT 생성
    const token = jwt.sign(
      {
        userId: userCheck.userId,
      },
      process.env.CUSTOMIZED_SECRET_KEY, // process.env.CUSTOMIZED_SECRET_KEY = jstol
    );

    // 2. 쿠키 발급
    res.cookie('authorization', `Bearer ${token}`);

    // 3. response
    return res.status(200).json({ message: '치올그램에 오신 여러분을 환영합니다.' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: '로그인 과정에 오류가 발생하였습니다.' });
  }
});

// 3. 회원 정보 조회 API [GET]
router.get('/userInfoList', async (req, res) => {
  try {
    const userList = await Users.findAll({
      attributes: ['userId', 'email', 'password', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ data: userList });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errorMessage: '유저 목록 조회 과정에 오류가 발생하였습니다.' });
  }
});

router.get('/userInfo/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const userInfo = await Users.findOne({
      where: { userId: userId },
      attributes: ['userId', 'email', 'password', 'createdAt'],
    });

    return res.status(200).json({ data: userInfo });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errorMessage: ' 유저 정보 조회 과정에 에러가 발생했습니다.' });
  }
});

// 4. 유저 비밀번호 수정 API [PUT]
router.put('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  const userIdToUpdate = await Users.findOne({
    where: { userId: userId },
  });

  if (!userIdToUpdate) {
    return res.status(404).json({ message: 'Id를 다시 확인해주세요.' });
  }

  try {
    await Users.update({ password: password }, { where: { userId: userId } });
    return res.status(200).json({ message: '유저 정보가 수정되었습니다.' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errorMessage: '유저 정보를 수정하는 과정에 오류가 발생하였습니다.',
    });
  }
});

// 5. 회원 탈퇴 API. [DELETE]
router.delete('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  const userIdToDelete = await Users.findOne({
    where: { userId: userId },
  });

  if (!userIdToDelete) {
    return res.status(404).json({ message: 'userId를 다시 확인해주세요.' });
  }

  try {
    await userIdToDelete.destroy();
    return res.status(200).json({ message: '계정이 삭제되었습니다.' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errorMessage: '계정을 삭제하는 과정에 오류가 발생하였습니다.',
    });
  }
});

module.exports = router;
*/
