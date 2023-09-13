const { Boards, Auths } = require('../models');
const { sequelize } = require('../models');

class BoardRepository {
  findAllBoard = async () => {
    const boards = await Boards.findAll();
    return boards;
  };

  // POST
  createBoard = async (content, hashtag, image, userId) => {
    try {
      await sequelize.transaction(async (t) => {
        const createBoardData = await Boards.create({
          content,
          hashtag,
          image,
          userId,
          transaction: t,
        });

        const boardId = createBoardData.boardId;
        const authId = userId;

        await Auths.create({
          boardId,
          authId,
          transaction: t,
        });
      });
    } catch (Error) {
      throw Error;
    }
  };

  // PUT
  putBoard = async (boardId, content, hashtag) => {
    const modifyData = await Boards.update(
      {
        content,
        hashtag,
      },
      {
        where: {
          boardId,
        },
      }
    );
    return modifyData;
  };

  // DELETE
  deleteBoard = async (boardId) => {
    const deletedData = await Boards.destroy({
      where: {
        boardId: boardId,
      },
    });

    return deletedData;
  };

  getAuth = async (userId, boardId) => {
    const auth = await Auths.findOne({ where: { authId: userId, boardId: boardId } });
    return auth;
  }
  //보드조회
  getBoardAuth = async (boardId) => {
    const board = await Boards.findAll({ where: { boardId } });
    return board;
  };
  // 보드 권한 설정
  grantPermission = async (boardId, authId) => {
    await Auths.create({
      boardId,
      authId,
    });
  };
}

module.exports = BoardRepository;
