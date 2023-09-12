const express = require('express');
const router = express.Router();

const usersRouter = require('./usersRoute');
router.use('/', usersRouter);

const boardsRouter = require('./boardsRoute');
router.use('/board', boardsRouter);

const cmtsRouter = require('./cmtsRoute');
router.use('/cmt', cmtsRouter);

const likesRouter = require('./likesRoute');
router.use('/like', likesRouter);

module.exports = router;
