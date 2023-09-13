const BoardService = require('../service/boardService.js');
const {getUserId,getUserName} = require('../util/user.util.js');

class BoardsController {
  boardService = new BoardService();

  // POST
  createBoard = async (req, res) => {
    const { content, hashtag, image } = req.body;
    // const userId = res.locals.userId;
    // const userId = res.locals.user.userId;
    const userId = getUserId(res);

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

    const { status, message, boards } = await this.boardService.findBoard(pageSize, pageNum);
    return res.status(status).json({ message, boards });
  };

  // GET - 게시글 상세조회
  findOneBoard = async (req, res) => {
    const { userId } = res.locals.user.userId;
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

  grantPermission = async (req, res) => {
    const creatorUserId = res.locals.user.userId;
    const { userId } = req.body;
    const { boardId } = req.params;

    try {
      // 권한을 부여하고 결과를 반환하는 서비스 호출
      const grantedPermissionResult = await this.boardsService.grantPermission(boardId, userId, creatorUserId);

      res.status(200).json({ message: '초대에 성공 하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
}

module.exports = BoardsController;
