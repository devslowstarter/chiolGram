const BoardRepository = require('../repository/boardRepository');
const ApiError = require('../apierror');

class BoardService {
  boardsRepository = new BoardRepository();

  // 보드 조회
  findAllBoard = async () => {
    const allBoard = await this.boardsRepository.findAllBoard();

    // 조회 후 생성날짜(createdAt)을 기준으로 정렬함
    // sort((a,b) => b - a)
    allBoard.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 조회한 결과에서 다음의 변수들을 반복해서 조회한다.
    return allBoard.map((board) => {
      return {
        content: board.content,
        hashtag: board.hashtag,
        image: board.image,
      };
    });
  };

  // 게시물 생성
  createBoard = async (content, hashtag, image, userId) => {
    
    if (!content || !hashtag || !image) {
      throw new ApiError('게시물 내용, 해시태그, 이미지, 사용자 ID를 입력해야 합니다.', 400);
    }

    await this.boardsRepository.createBoard(content, hashtag, image, userId);
  };

  // 게시글 수정
  updateBoard = async (boardId, content, hashtag, userId) => {
    if (!content || !hashtag) {
      throw new ApiError('게시물 제목, 내용을 입력해야 합니다.', 411);
    }

    const auth = await this.boardsRepository.getAuth(userId, boardId);
    if (!auth) {
      throw new ApiError('보드를 수정할 권한이 없습니다.', 411);
    }
  };

  // 게시글 삭제
  deleteBoard = async (boardId, userId) => {
    const board = await this.boardsRepository.getBoardAuth(boardId);
    if (!board) {
      throw new ApiError('게시물을 찾을 수 없습니다.', 411);
    }

    if (board.userId !== userId) {
      throw new ApiError('게시물 생성자가 아닙니다.', 411);
    }
    await this.boardsRepository.deleteBoard(boardId);
  };

  grantPermission = async (boardId, userId, creatorUserId) => {
    const board = await this.boardsRepository.getBoardAuth(boardId);

    if (!board) {
      throw new ApiError('게시물을 찾을 수 없습니다.', 404);
    }

    if (board.userId !== creatorUserId) {
      throw new ApiError('게시물 생성자만 권한을 부여할 수 있습니다.', 403);
    }

    const authId = userId;
    await this.boardsRepository.grantPermission(boardId, authId);
  };
}

module.exports = BoardService;
