const { boards } = require('../models');

class BoardRepository {
  // 게시글 전체 조회
  findAllBoard = async (findOption) => await boards.findAll(findOption);

  // 게시글 상세 조회
  findOneBoard = async (findOption) => await boards.findOne(findOption);

  // 게시글 작성
  createBoard = async (createData) => await boards.create(createData);

  // 게시글 수정
  updateBoard = async (updateData, updateOption) =>
    await boards.update(updateData, { where: updateOption });

  // 게시글 삭제
  deleteBoard = async (deleteOption) => await boards.destroy({ where: deleteOption });
}

module.exports = BoardRepository;
