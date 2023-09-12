const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const CmtController = require('../controller/cmtController');
const cmtController = new CmtController();

router.post('/:boardId', authMiddleware, cmtController.createCmt);
router.get('/:boardId', authMiddleware, cmtController.getCmt);
router.put('/:boardId/:cmtId', authMiddleware, cmtController.updateCmt);
router.delete('/:boardId/:cmtId', cmtController.deleteCmt);

module.exports = router;
