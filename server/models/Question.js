const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  option4: {
    type: String,
    required: true,
  },
  correct_option: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Question', questionSchema);
