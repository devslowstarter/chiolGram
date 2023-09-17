const jwt = require('jsonwebtoken');
const { Users } = require('../models');

require('dotenv').config();

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;
  const [authType, authToken] = (Authorization ?? '').split(' ');

  if (!authToken || authType !== 'Bearer') {
    res.status(403).send({
      errorMessage: '로그인이 필요한 기능입니다.',
    });
    return;
  }

  try {
    const { userId } = jwt.verify(authToken, process.env.CUSTOMIZED_SECRET_KEY);
    const user = await Users.findOne({ where: { userId } });
    if (!user) {
      res.clearCookie('authorization');
      return res.status(401).json({ errorMessage: '토큰 사용자가 존재하지 않습니다.' });
    }
    res.locals.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.clearCookie('authorization');
    res.status(403).send({
      errorMessage: '전달된 쿠키에서 오류가 발생하였습니다.',
    });
  }
};
