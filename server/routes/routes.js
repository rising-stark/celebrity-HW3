const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const questionsController = require("../controllers/questionsController");

// Auth routes
router.get("/auth", usersController.authenticate);
router.post("/login", usersController.login);

// Question routes
router.get("/game", questionsController.getQuestions);

// User routes
router.get("/leaderboard", usersController.getLeaderboard);
router.get("/users/:username", usersController.getScore);
router.put("/users/:username", usersController.updateScore);
router.delete("/users/:username", usersController.deleteUser);

module.exports = router;
