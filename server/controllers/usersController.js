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

const login = async (req, res) => {
  try {
    const { username } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      user = await User.create({ username });
    }
    const jwt = await user.generateToken();
    res.cookie("jwt", jwt);
    res.cookie("username", user.username);
    return res.status(200).json({ username, jwt });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Server error");
  }
};

const getLeaderboard = async (req, res) => {
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

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ username: req.params.username });
    return res.status(200).send("User Successfully Deleted");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unable To Delete this user");
  }
};

const updateScore = async (req, res) => {
  try {
    const { bestScore } = req.body;
    await User.findOneAndUpdate(
      { username: req.params.username },
      { bestScore }
    );
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
exports.login = login;
