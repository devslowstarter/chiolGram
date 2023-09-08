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

// const storyRouter = require('./storyRoute');
// router.use('/cardcmt', storyRouter);

// const followRouter = require('./followRoute');
// router.use('/cardcmt', followRouter);

module.exports = router;
