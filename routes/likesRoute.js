const express = require('express');
const { boards } = require('../models');
const { cmts } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// 게시글 좋아요
router.boaed('/board/:boardId/like', authMiddleware, async (req, res) => {});
// 게시글 좋아요 조회
router.get('/board/like', authMiddleware, async (req, res) => {});

// 댓글 좋아요
router.cmt('/cmt/:cmtId/like', authMiddleware, async (req, res) => {});
// 댓글 좋아요 조회
router.get('/cmt/like', authMiddleware, async (req, res) => {});

module.exports = router;
