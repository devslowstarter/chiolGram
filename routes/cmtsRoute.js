const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const { Cmts } = require('../models');

// POST 댓글 생성: localhost:3000/:boardId/cmt
router.post('/:boardId/cmt', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { boardId } = req.params;
  const { content } = req.body;

  const cmts = await Cmts.create({
    userId: userId,
    boardId: boardId,
    content: content,
  });

  if (!cmts) {
    return res.status(400).json({ message: '댓글 등록에 실패하였습니다.' });
  }

  return res.status(200).json({ data: '등록이 완료되었습니다.' });
});

// GET 댓글 조회: localhost:3000/:boardId/cmt
router.get('/:boardId/cmt', async (req, res) => {
  const { boardId } = req.params;

  const cmts = await Cmts.findAll({
    where: {
      boardId: boardId,
    },
    attributes: ['cmtId', 'userId', 'boardId', 'content', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']],
  });

  if (!cmts) {
    return res.status(400).json({ message: '댓글 조회에 실패하였습니다.' });
  }

  return res.status(200).json({ data: '조회가 완료되었습니다.' });
});

// PUT 댓글 수정: localhost:3000/:boardId/cmt/:cmtId
router.put('/:boardId/cmt/:cmtId', authMiddleware, async (req, res) => {
  const { cmtId } = req.params;
  const { userId } = res.locals.user;
  const { content } = req.body;

  const cmts = await Cmts.findOne({
    where: { cmtId },
  });
  if (!cmts) {
    return res.status(400).json({ message: '댓글 수정에 실패하였습니다.' });
  } else if (cmts.userId !== userId) {
    return res.status(403).json({ message: '수정 권한이 없습니다.' });
  }

  await cmts.update({ content });

  return res.status(200).json({ data: '댓글이 수정되었습니다.' });
});

// DELETE 댓글 삭제: localhost:3000/:boardId/cmt/:cmtId
router.delete('/:boardId/cmt/:cmtId', authMiddleware, async (req, res) => {
  const { cmtId } = req.params;
  const { userId } = res.locals.user;

  const cmts = await Cmts.findOne({ where: { cmtId } });
  if (!cmts) {
    return res.status(400).json({ message: '댓글 삭제가 실패하였습니다.' });
  } else if (cmts.userId !== userId) {
    return res.status(403).json({ message: '삭제 권한이 없습니다.' });
  }

  await cmts.destroy();

  return res.status(200).json({ data: '댓글이 삭제되었습니다.' });
});

module.exports = router;







