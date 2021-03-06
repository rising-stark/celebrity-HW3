const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authorise = async (req, res, next) => {
  try {
    // Get the Cookies
    const token = req.cookies.jwt;
    const { username } = req.cookies;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    let rootUser;
    if (verifyToken.username === username) {
      rootUser = await User.findOne({
        username: verifyToken.username,
        'tokens.token': token,
      });
    }
    if (!rootUser) {
      res.status(401).send('User Not Found');
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send('Error');
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
    const token = await user.generateToken();
    res.cookie('jwt', token);
    res.cookie('username', user.username);
    return res.status(200).json({ username, jwt: token });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Server error');
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const leaderCount = req.body.leaderCount || 10;
    const leaderboard = await User.find({}, { username: 1, bestScore: 1, _id: 0 })
      .sort({ bestScore: -1 })
      .limit(leaderCount);
    return res.status(200).json({ leaderboard });
  } catch (err) {
    console.log(err);
    return res.status(400).send('No users found');
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ username: req.params.username });
    return res.status(200).send('User Successfully Deleted');
  } catch (err) {
    console.log(err);
    return res.status(400).send('Unable To Delete this user');
  }
};

const updateScore = async (req, res) => {
  try {
    const { bestScore } = req.body;
    await User.findOneAndUpdate(
      { username: req.params.username },
      { bestScore },
    );
    return res.status(200).send('User bestScore successfully updated');
  } catch (err) {
    console.log(err);
    return res.status(400).send('Unable To update user bestScore');
  }
};

const getScore = async (req, res) => {
  try {
    const myScore = await User.findOne(
      { username: req.params.username },
      { bestScore: 1, _id: 0 },
    );
    const bestScore = await User.find({}, { username: 1, bestScore: 1, _id: 0 })
      .sort({ bestScore: -1 })
      .limit(1);
    return res.status(200).json({ myScore, bestScore });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Unable To find user score');
  }
};

exports.authorise = authorise;
exports.getLeaderboard = getLeaderboard;
exports.deleteUser = deleteUser;
exports.updateScore = updateScore;
exports.getScore = getScore;
exports.login = login;
