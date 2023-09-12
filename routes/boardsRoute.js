const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const BoardController = require('../controller/boardController');
const boardController = new BoardController();

router.post('/', authMiddleware, boardController.createBoard);
router.get('/', boardController.getBoards);
router.get('/:boardId', boardController.getBoardById);
router.put('/:boardId', authMiddleware, boardController.updateBoard);
router.delete('/board/:boardId', authMiddleware, boardController.deleteBoard);

module.exports = router;