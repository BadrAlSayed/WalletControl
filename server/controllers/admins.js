const Admin = require("../models/admin");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { userName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ userName, password: hashedPassword });
  try {
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const checkAdmin = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const admin = await Admin.findOne({ userName });
    if (!admin) {
      return res.status(401).send({ error: "Admin not found" });
    }
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).send({ error: "Invalid password" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { register, checkAdmin };
