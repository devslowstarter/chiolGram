const express = require("express");
const { Boards } = require("../models");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// 게시글 등록 [board]
router.post("/board", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { title, content, hashtag } = req.body;

  if (!userId) {
    res.status(403).json({ errorMessage: "로그인 후 사용 가능합니다." });
    return;
  }

  if (!title) {
    return res.status(400).json({ errorMessage: "제목을 입력해주세요." });
  }

  if (!content) {
    return res.status(400).json({ errorMessage: "내용을 입력해주세요." });
  }

  try {
    const addBoard = await Boards.create({
      title,
      content,
      hashtag,
      userId: userId,
    });

    return res.status(201).json({ data: addBoard });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "게시글 등록 과정에 오류가 발생하였습니다." });
  }
});

// 게시글 전체 조회 [GET]
router.get("/board", async (req, res) => {
  try {
    const boards = await Boards.findAll({
      attributes: ["boardId", "userId", "title", "content", "hashtag", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ data: boards });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "게시글 전제 조회 과정에 오류가 발생하였습니다." });
  }
});

// 게시글 수정 [PUT]
router.put("/board/:boardId", authMiddleware, async (req, res) => {
  const { boardId } = req.params;
  const { userId } = res.locals.user;
  const { content } = req.body;
  // const imageUrl = req.file.location;

  try {
    const boards = await Boards.findOne({
      where: { boards: boards },
    });
    console.log(boards);

    if (boards.userId !== userId) {
      return res
        .status(403)
        .json({ errorMessage: "게시글을 수정할 권한이 없습니다." });
    }

    if (!boards) {
      return res
        .status(404)
        .json({ errorMessage: "게시글를 찾을 수 없습니다." });
    }

    await Boards.update({ content }, { where: { boardId: boardId } });

    return res.status(200).json({ message: "게시글 수정을 완료하였습니다." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "게시글 수정 과정에 오류가 발생하였습니다." });
  }
});

// 게시글 삭제_DELETE
router.delete("/board/:boardId", authMiddleware, async (req, res) => {
  const { boardId } = req.params;
  const { userId } = res.locals.user;

  try {
    const board = await Boards.findOne({
      where: { boardId: boardId },
    });
    console.log(board);

    if (board.userId !== userId) {
      return res
        .status(403)
        .json({ errorMessage: "게시글을 삭제할 권한이 없습니다." });
    }

    if (!board) {
      return res.status(404).json({ errorMessage: "메뉴를 찾을 수 없습니다." });
    }

    await Boards.destroy({ where: { boardId: boardId } });

    return res.status(200).json({ message: "게시글 삭제를 완료하였습니다." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "게시글 삭제에 실패하였습니다." });
  }
});

module.exports = router;