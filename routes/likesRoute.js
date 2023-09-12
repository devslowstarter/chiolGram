const express = require('express');
const { bords } = require('../models');

const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const PostLikesController = require('../controllers/postlikes.controller');
const postLikesController = new PostLikesController();

// 게시물 좋아요 생성
router.post('/bords/:bordId/like', Authmiddleware, postLikesController.createPostLikes);

// 게시물 좋아요 삭제
router.delete('/bords/:bordId/like', Authmiddleware, postLikesController.deletePostLikes);

// 댓글 좋아요 생성
router.post('/cmts/:cmtId/like', Authmiddleware, postLikesController.createCommentLikes);

// 댓글 좋아요 삭제
router.delete('/cmts/:cmtId/like', Authmiddleware, postLikesController.deleteCommentLikes);

module.exports = router;
