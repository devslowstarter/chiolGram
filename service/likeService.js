const LikeRepository = require('../repository/likeRepository');
const BoardRepository = require('../repository/boardRepository');
const { Users, Boards } = require('../models');

class LikeService {
  likeRepository = new LikeRepository();
  boardRepository = new BoardRepository();

  // 좋아요 한 게시글 조회
  findLikedBoards = async (userId) => {
    const likedPosts = await this.likeRepository.findAllLiked({
      where: { userId },
      attributes: ['boardId'],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
        {
          model: Boards,
          attributes: ['content', 'hashtag', 'likeCount'],
        },
      ],
      order: [[Boards, 'likeCount', 'DESC']],
    });

    if (likedBoards.length === 0) {
      return {
        status: 200,
        message: '아직 좋아요한 게시글이 없습니다.',
      };
    }

    return {
      status: 200,
      likedPosts,
    };
  };

  // 좋아요, 좋아요 취소
  boardLikeUnlike = async (boardId, userId) => {
    const findPostData = await this.postRepository.findOnePost({
      where: { boardId },
    });

    if (!findPostData) {
      return {
        status: 404,
        message: '존재하지 않는 게시글입니다.',
      };
    }

    const findLikeData = await this.likeRepository.findOneLiked({
      where: { boardId: findPostData.boardId, userId },
    });

    if (!findLikeData) {
      await this.boardRepository.updatePost(
        { likeCount: findPostData.likeCount + 1 },
        { boardId: findPostData.boardId },
      );
      await this.likeRepository.boardLike({
        boardId: findPostData.boardId,
        userId,
      });
      return {
        status: 200,
        message: '게시물에 좋아요를 눌렀습니다.',
      };
    }

    await this.boardRepository.updatePost(
      { likeCount: findPostData.likeCount - 1 },
      { boardId: findPostData.boardId },
    );
    await this.likeRepository.postUnlike({
      where: { boardId: findPostData.boardId, userId },
    });
    return {
      status: 200,
      message: '좋아요를 취소했습니다.',
    };
  };
}

module.exports = LikeService;
