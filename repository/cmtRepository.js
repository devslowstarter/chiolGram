const { cmts } = require('../models');

class cmtRepository {
  // 댓글 조회
  getCmt = async (cmtId) => {
    return await cmts.findOne({ where: { id: cmtId } });
  };

  createCmt = async (boardId, content) => {
    await cmts.create({ boardId, content });
  };

  updateCmt = async (cmtId, content) => {
    return await cmts.update({ content }, { where: { id: cmtId } });
  };

  deleteCmt = async (cmtId) => {
    return await cmts.destroy({ where: { id: cmtId } });
  };
}

module.exports = cmtRepository;
