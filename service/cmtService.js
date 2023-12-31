const CmtRepository = require('../repository/cmtRepository');
const ApiError = require('../apierror');

class CmtService {
  cmtsRepository = new CmtRepository();

  // POST
  async createCmt(userId, boardId, content) {
    try {
      const comment = await this.cmtsRepository.createCmt({
        userId,
        boardId,
        content,
      });
      return { status: 201, message: '댓글이 성공적으로 생성되었습니다.', comment };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '댓글 등록 과정에 오류가 발생하였습니다.' };
    }
  }
  // GET
  async getCmt(boardId) {
    try {
      const comments = await this.cmtsRepository.getCmt({
        where: {
          boardId,
        },
        attributes: ['cmtId', 'userId', 'boardId', 'content', 'createdAt', 'updatedAt'],
        order: [['createdAt', 'DESC']],
      });

      return { status: 200, message: '조회가 완료되었습니다.', comments };
    } catch (error) {
      console.error(error);
      return { status: 400, message: '댓글 조회에 실패하였습니다.' };
    }
  }
  // PUT
  async updateCmt(cmtId, userId, content) {
    try {
      const comment = await this.cmtsRepository.findOne({
        where: { cmtId },
      });

      if (!comment) {
        return { status: 404, message: '댓글을 찾을 수 없습니다.' };
      }

      if (comment.userId !== userId) {
        return { status: 403, message: '수정 권한이 없습니다.' };
      }

      await comment.update({ content });

      return { status: 200, message: '댓글이 수정되었습니다.' };
    } catch (error) {
      console.error(error);
      return { status: 400, message: '댓글 수정에 실패하였습니다.' };
    }
  }
  // DELETE
  async deleteCmt(cmtId, userId) {
    try {
      const comment = await this.cmtsRepository.findOne({ where: { cmtId } });

      if (!comment) {
        return { status: 404, message: '댓글을 찾을 수 없습니다.' };
      }

      if (comment.userId !== userId) {
        return { status: 403, message: '삭제 권한이 없습니다.' };
      }

      await comment.destroy();

      return { status: 200, message: '댓글이 삭제되었습니다.' };
    } catch (error) {
      console.error(error);
      return { status: 400, message: '댓글 삭제가 실패하였습니다.' };
    }
  }
}

module.exports = CmtService;
