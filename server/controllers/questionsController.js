const Question = require("../models/Question");

const getQuestions = async (req, res) => {
  try {
    let questionsCount = req.body.questionsCount || 10;
    let questions = await Question.aggregate([
      { $sample: { size: questionsCount } },
    ]);
    return res.status(200).json({ questions });
  } catch (err) {
    console.log(err);
    return res.status(400).send("No questions found");
  }
};

exports.getQuestions = getQuestions;
