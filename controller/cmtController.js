const CmtService = require('../service/cmtService');

class CmtController {
  cmtService = new CmtService();

  // POST
  createCmt = async (req, res) => {
    const { content } = req.body;
    const { boardId } = req.params;
    const { userId } = res.locals.user;

    const { status, message } = await this.cmtService.createCmt(content, boardId, userId);

    return res.status(status).json({ message });
  };

  // GET - boardId로 댓글 조회
  getCmt = async (req, res) => {
    const { boardId } = req.params;

    try {
      const cmts = await this.cmtService.getCmt(boardId);

      return res.status(200).json({ cmts });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  // PUT
  updateCmt = async (req, res) => {
    const { content } = req.body;
    const { cmtId } = req.params;
    const { userId } = res.locals.user;

    try {
      await this.cmtService.updateCmt(cmtId, userId, content);
      return res.status(200).json({ message: '댓글을 수정하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  // DELETE
  deleteCmt = async (req, res) => {
    const { cmtId } = req.params;

    try {
      await this.cmtService.deleteCmt(cmtId);
      return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
}

module.exports = CmtController;
