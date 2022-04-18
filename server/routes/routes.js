const express = require('express');

const router = express.Router();
const usersController = require('../controllers/usersController');
const questionsController = require('../controllers/questionsController');

// Auth routes
router.post('/auth', usersController.authorise);
router.post('/login', usersController.login);

// Question routes
router.get(
  '/questions',
  usersController.authorise,
  questionsController.getQuestions,
);

// User routes
router.get(
  '/leaderboard',
  usersController.authorise,
  usersController.getLeaderboard,
);
router.get(
  '/users/:username',
  usersController.authorise,
  usersController.getScore,
);
router.put(
  '/users/:username',
  usersController.authorise,
  usersController.updateScore,
);
router.delete(
  '/users/:username',
  usersController.authorise,
  usersController.deleteUser,
);

module.exports = router;
