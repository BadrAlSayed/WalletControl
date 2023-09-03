const mongoose = require("mongoose");
const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { balance } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  const currUser = await User.findById(id);
  currUser.transactions.unshift({
    balance: currUser.balance,
    date: Date.now(),
  });
  currUser.balance = balance;
  try {
    await currUser.save();
    res.status(200).json(currUser);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser };
