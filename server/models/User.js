const mongoose = require("mongoose");

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
  { timestamps: true }
);

// Generate Tokens to Verify User
userSchema.methods.generateToken = async function () {
  try {
    let generatedToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: generatedToken });
    await this.save();
    return generatedToken;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("User", userSchema);
