const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const questionsController = require("../controllers/questionsController");

// Auth routes
router.get("/auth", usersController.authenticate);

// Question routes
router.get("/game", questionsController.getQuestions);

// User routes
router.get("/leaderboard", usersController.getLeaderboard);
router.put("/users/:id", usersController.updateScore);
router.delete("/users/:id", usersController.deleteUser);

module.exports = router;
