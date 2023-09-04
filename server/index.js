const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const usersRoutes = require("./routes/users.js");
const adminsRoutes = require("./routes/admins.js");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/admins", adminsRoutes);
const MONGO_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_KEY}@cluster0.sn1100o.mongodb.net/`;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
