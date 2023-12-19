const express =require("express");
var mongoose = require('mongoose');
const connectDB = require("./../models/_db");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = connectDB;


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function getUserByUsername(username) {
  let user;
  try {
    await client.connect();
    const collection = client.db("SE_Project").collection("UserAuth");

    user = await collection.findOne({ username });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }

  return user;
}

function generateToken(user) {
  const payload = {
    userId: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, "loginapi1234", { expiresIn: "1h" });

  return token;
}

module.exports = router;
