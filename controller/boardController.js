const BoardService = require('../service/board.service.js');

class BoardsController {
  boardService = new PostService();

  // 게시글 전체 조회
  getBords = async (req, res) => {
    const pageSize = Number(req.query.pageSize ? req.query.pageSize : 10);
    const pageNum = Number(req.query.pageNum ? req.query.pageNum : 1);

    const { status, message, posts } = await this.boardService.findBoard(pageSize, pageNum);

    return res.status(status).json({ message, posts });
  };

  // 게시글 상세 조회
  getBordById = async (req, res) => {
    const { postId } = req.params;

    const { status, message, post } = await this.postService.findOneBoard(postId);

    return res.status(status).json({ message, post });
  };

  // 게시글 작성
  createBord = async (req, res) => {
    const { title, content } = req.body;
    const userId = res.locals.userId;

    const { status, message } = await this.postService.createBoard(title, content, userId);

    return res.status(status).json({ message });
  };

  // 게시글 수정
  updateBoard = async (req, res) => {
    const { title, content } = req.body;
    const { postId } = req.params;
    const userId = res.locals.userId;

    const { status, message } = await this.postService.updateBoard(title, content, postId, userId);

    return res.status(status).json({ message });
  };

  // 게시글 삭제
  deleteBoard = async (req, res) => {
    const { postId } = req.params;
    const userId = res.locals.userId;

    const { status, message } = await this.postService.deleteBoard(postId, userId);

    return res.status(status).json({ message });
  };
}

module.exports = BoardsController;
