const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bestScore: {
      type: Number,
      required: true,
      default: 0,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

// Generate Tokens to Verify User
// eslint-disable-next-line func-names
userSchema.methods.generateToken = async function () {
  let generatedToken;
  try {
    generatedToken = jwt.sign(
      { username: this.username },
      process.env.SECRET_KEY,
    );
    this.tokens = this.tokens.concat({ token: generatedToken });
    await this.save();
  } catch (error) {
    console.log(error);
  }
  return generatedToken;
};

module.exports = mongoose.model('User', userSchema);
