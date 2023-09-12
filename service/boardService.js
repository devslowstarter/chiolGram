const BoardRepository = require('../repository/boardRepository.js');
const { Boards } = require('../models');

class BoardService {
  // 게시글 생성
  async createBoard(userId, title, content, hashtag, image, createdAt, updatedAt) {
    try {
      const board = await Boards.create({
        userId,
        title,
        content,
        hashtag,
        image,
        createdAt,
        updatedAt,
      });

      return { status: 201, message: '게시글이 성공적으로 생성되었습니다.', board };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '게시글 등록 과정에 오류가 발생했습니다.' };
    }
  }

  // 게시글 전체 조회
  async getBoardById(boardId) {
    try {
      const board = await Boards.findOne({ where: { boardId } });
      if (!board) {
        return { status: 404, message: '게시글을 찾을 수 없습니다.' };
      }
      return { status: 200, message: '게시글 조회 성공', board };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '게시글 조회 중 오류가 발생했습니다.' };
    }
  }

  // 게시글 수정
  async updateBoard(boardId, content, updatedAt) {
    try {
      const [updatedRowsCount] = await Boards.update(
        { content, updatedAt },
        { where: { boardId } },
      );

      if (updatedRowsCount === 0) {
        return { status: 404, message: '게시글을 찾을 수 없습니다.' };
      }

      return { status: 200, message: '게시글 수정이 완료되었습니다.' };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '게시글 수정 중 오류가 발생했습니다.' };
    }
  }

  // 게시글 삭제
  async deleteBoard(boardId) {
    try {
      const deletedRowsCount = await Boards.destroy({ where: { boardId } });

      if (deletedRowsCount === 0) {
        return { status: 404, message: '게시글을 찾을 수 없습니다.' };
      }

      return { status: 200, message: '게시글 삭제가 완료되었습니다.' };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '게시글 삭제 중 오류가 발생했습니다.' };
    }
  }
}

module.exports = BoardService;
