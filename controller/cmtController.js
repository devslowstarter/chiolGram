const cmtService = require('../service/cmt.service.js');

class CmtController {
  cmtService = new cmtService();

  // 댓글 조회
  getcmt = async (req, res) => {
    const pageSize = Number(req.query.pageSize ? req.query.pageSize : 10);
    const pageNum = Number(req.query.pageNum ? req.query.pageNum : 1);
    const { boardId } = req.params;

    const { status, message, cmt } = await this.cmtService.findcmt(pageSize, pageNum, boardId);

    return res.status(status).json({ message, cmt });
  };

  // 댓글 작성
  createcmt = async (req, res) => {
    const { content } = req.body;
    const { boardId } = req.params;
    const userId = res.locals.userId;

    const { status, message } = await this.cmtService.createcmt(content, boardId, userId);

    return res.status(status).json({ message });
  };

  // 댓글 수정
  updatecmt = async (req, res) => {
    const { content } = req.body;
    const { boardId, cmtId } = req.params;
    const userId = res.locals.userId;

    const { status, message } = await this.cmtService.updatecmt(content, boardId, cmtId, userId);

    return res.status(status).json({ message });
  };

  // 댓글 삭제
  deletecmt = async (req, res) => {
    const { boardId, cmtId } = req.params;
    const userId = res.locals.userId;

    const { status, message } = await this.cmtService.deletecmt(boardId, cmtId, userId);

    return res.status(status).json({ message });
  };
}

module.exports = CmtController;
