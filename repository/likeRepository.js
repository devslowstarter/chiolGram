const { Likes } = require('../models');

class LikeRepository {
    // likeData 찾기
    findAllLiked = async (findOption) => await Likes.findAll(findOption);
    findOneLiked = async (findOption) => await Likes.findOne(findOption);

    // 게시판 좋아요
    boardLike = async (likeData) => await Likes.create(likeData);
    boardUnlike = async (unlikeData) => await Likes.destroy(unlikeData);
    
    // 댓글 좋아요
    cmtLike = async (likeData) => await Likes.create(likeData);
    cmtUnlike = async (unlikeData) => await Likes.destroy(unlikeData);
}

module.exports = LikeRepository;