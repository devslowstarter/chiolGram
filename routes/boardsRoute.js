const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const BoardController = require('../controller/boardController');
const boardController = new BoardController();

router.post('/', authMiddleware, boardController.createBoard);
router.get('/', boardController.findAllBoard);
router.get('/:boardId', boardController.findOneBoard);
router.put('/:boardId', authMiddleware, boardController.updateBoard);
router.delete('/:boardId', authMiddleware, boardController.deleteBoard);
router.post('/auth/:boardId', authMiddleware, boardController.grantPermission); //보드 권한 설정

module.exports = router;