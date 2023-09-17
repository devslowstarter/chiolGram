const BoardService = require('../service/boardService.js');
// const { getUserId } = require('../util/user.util.js');

class BoardsController {
  boardService = new BoardService();

  // POST
  createBoard = async (req, res) => {
    const { userId } = res.locals.user;
    // const { userId } = res.locals.userId;
    const { content, hashtag, image } = req.body;
    console.log('content', content);
    console.log('hashtag', hashtag);
    console.log('image', image);
    console.log('userId', userId);

    try {
      await this.boardService.createBoard(content, hashtag, image, userId);
      res.status(200).json({ message: '게시물 생성에 성공했습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  // GET - 게시글 전체조회
  findAllBoard = async (req, res) => {
    const pageSize = Number(req.query.pageSize ? req.query.pageSize : 10);
    const pageNum = Number(req.query.pageNum ? req.query.pageNum : 1);

    // const { status, message, boards } = await this.boardService.findAllBoard(pageSize, pageNum);
    // return res.status(status).json({ message, boards });
    const defaultStatus = 200; // 예: 200은 성공 상태 코드
    const {
      status = defaultStatus,
      message,
      boards,
    } = await this.boardService.findAllBoard(pageSize, pageNum);
  };

  // GET - 게시글 상세조회
  findOneBoard = async (req, res) => {
    const { userId } = res.locals.user.userId;
    const { boardId } = req.params;

    try {
      const getboard = await this.boardsService.findOneBoar(userId, boardId);
      return res.status(200).json({ data: getboard });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  // PUT
  updateBoard = async (req, res) => {
    const { userId } = res.locals.user.userId;
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
