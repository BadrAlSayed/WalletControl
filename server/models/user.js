const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  balance: Number,
  transactions: [
    {
      balance: Number,
      date: Date,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
