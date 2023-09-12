const express = require('express');
const { boards } = require('../models');

const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// 게시물!
const BoardLikeController = require('../controller/likeController');
const boardLikeController = new BoardLikeController();

// 댓글!
const CmtLikeController = require('../controller/likeController');
const cmtLikeController = new CmtLikeController();

// 게시물 좋아요
router.post('/boards/:boardId/like', authMiddleware, boardLikeController.getLikedPosts);
router.delete('/boards/:boardId/like', authMiddleware, boardLikeController.boardLikeUnlike);

// 댓글 좋아요
router.post('/cmts/:cmtId/like', authMiddleware, cmtLikeController.getLikedCmts);
router.delete('/cmts/:cmtId/like', authMiddleware, cmtLikeController.cmtLikeUnlike);

module.exports = router;
