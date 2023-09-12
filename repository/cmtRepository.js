const { cmts } = require('../models');

class cmtRepository {
  // 댓글 조회
  findAllcmt = async (findOption) => await cmts.findAll(findOption);

  // 댓글 상세 조회
  findOnecmt = async (findOption) => await cmts.findOne(findOption);

  // 댓글 작성
  createcmt = async (createData) => await cmts.create(createData);

  // 댓글 수정
  updatecmt = async (updateData, updateOption) =>
    await cmts.update(updateData, { where: updateOption });

  // 댓글 삭제
  deletecmt = async (deleteOption) => await cmts.destroy({ where: deleteOption });
}

module.exports = cmtRepository;
