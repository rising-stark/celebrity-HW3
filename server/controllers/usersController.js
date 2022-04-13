const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    // Get the Cookies
    const token = req.cookies.jwt;
    if (!token) {
      res.status(400).send("No token");
    } else {
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const rootUser = await User.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });
      if (!rootUser) {
        res.status(400).send("User Not Found");
      } else {
        res.status(200).send("Authorized User");
      }
    }
  } catch (error) {
    res.status(400).send("Error");
    console.log(error);
  }
};

const getLeaderboard = async (req, res, next) => {
  try {
    let leaderCount = req.body.leaderCount || 10;
    let leaderboard = await User.find({}, { username: 1, bestScore: 1, _id: 0 })
      .sort({ bestScore: -1 })
      .limit(leaderCount);
    return res.status(200).json({ leaderboard });
  } catch (err) {
    console.log(err);
    return res.status(400).send("No users found");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    return res.status(200).send("User Successfully Deleted");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unable To Delete this user");
  }
};

const updateScore = async (req, res, next) => {
  try {
    const { bestScore } = req.body;
    await User.findByIdAndUpdate(id, {
      bestScore,
    });
    return res.status(200).send("User bestScore successfully updated");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unable To update user bestScore");
  }
};
exports.authenticate = authenticate;
exports.getLeaderboard = getLeaderboard;
exports.deleteUser = deleteUser;
exports.updateScore = updateScore;
