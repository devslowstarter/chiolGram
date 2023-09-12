const LikeService = require('../service/likeService');

class LikeController {
  likeService = new LikeService();

  // 좋아요한 게시글 조회
  getLikedPosts = async (req, res) => {
    const userId = res.locals.userId;

    const { status, message, likedPosts } =
      await this.likeService.findLikedPosts(userId);

    return res.status(status).json({ message, likedPosts });
  };

  // 좋아요한 댓글 조회
  getLikedCmts = async (req, res) => {
    const userId = res.locals.userId;

    const { status, message, likedPosts } =
      await this.likeService.findLikedPosts(userId);

    return res.status(status).json({ message, likedPosts });
  };

  // 게시글 좋아요 + 취소
  boardLikeUnlike = async (req, res) => {
    const { userId } = res.locals.user;
    const { boardId } = req.params;

    const { status, message } = await this.likeService.boardLikeUnlike(
      boardId,
      userId
    );

    return res.status(status).json({ message });
  };

  // 댓글 좋아요 + 취소
  cmtLikeUnlike = async (req, res) => {
    const { userId } = res.locals.user;
    const { boardId, cmtId } = req.params;

    const { status, message } = await this.likeService.boardLikeUnlike(
        cmtId,
        boardId,
        userId
    );

    return res.status(status).json({ message });
  };
}

module.exports = LikeController;