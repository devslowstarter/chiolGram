const BoardService = require('../service/boardService.js');

class BoardsController {
  boardService = new BoardService();

  // POST
  createBoard = async (req, res) => {
    const { content, hashtag } = req.body;
    const userId = res.locals.userId;

    try {
      await this.boardService.createBoard(content, hashtag, userId);
      res.status(200).json({ message: '게시물 생성에 성공했습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  // GET - 게시글 전체조회
  getBoards = async (req, res) => {
    const pageSize = Number(req.query.pageSize ? req.query.pageSize : 10);
    const pageNum = Number(req.query.pageNum ? req.query.pageNum : 1);

    const { status, message, boards } = await this.boardService.findBoard(pageSize, pageNum);
    return res.status(status).json({ message, boards });
  };

  // GET - 게시글 상세조회
  getBoardById = async (req, res) => {
    const { userId } = res.locals.user;
    const { boardId } = req.params;
    
    try {
      const getboard = await this.boardsService.getBoardAuth(userId, boardId);
      return res.status(200).json({ data: getboard });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  // PUT
  updateBoard = async (req, res) => {
    const { userId } = res.locals.user;
    const { boardId } = req.params;
    const { content, hashtag } = req.body;

    try {
      await this.boardService.updateBoard(content, hashtag, boardId, userId);
      res.status(200).json({ message: '게시물 수정에 성공했습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  // DELETE
  deleteBoard = async (req, res) => {
    const { boardId } = req.params;
    const { userId } = res.locals.user;

    try {
      await this.boardsService.deleteBoard(boardId, userId);
      res.status(200).json({ message: '게시물 삭제에 성공했습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
}

module.exports = BoardsController;
