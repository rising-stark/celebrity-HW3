const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.status(200).send("First response");
});

module.exports = router;
