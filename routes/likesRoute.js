const express = require('express');
const { bords } = require('../models');

const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const PostLikesController = require('../controllers/postlikes.controller');
const postLikesController = new PostLikesController();

// 게시물 좋아요 생성
router.post('/boards/:bordId/like', authMiddleware, postLikesController.createPostLikes);

// 게시물 좋아요 삭제
router.delete('/boards/:bordId/like', authMiddleware, postLikesController.deletePostLikes);

// 댓글 좋아요 생성
router.post('/cmts/:cmtId/like', authMiddleware, postLikesController.createCommentLikes);

// 댓글 좋아요 삭제
router.delete('/cmts/:cmtId/like', authMiddleware, postLikesController.deleteCommentLikes);

module.exports = router;
