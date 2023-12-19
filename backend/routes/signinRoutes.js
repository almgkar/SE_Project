const express = require("express");
const router = express.Router();
const connectDB = require("./../models/_db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const user_passkey = req.body.user_passkey;
    const conn = connectDB;
    conn
      .then((res1) => {
        const res2 = res1.db("SE_Project").collection("UserAuth");
        const query = {};
        query.user_id = new RegExp(`\\b${user_id}\\b`, "i");

        const cursor = res2.find(query);
        const result = cursor.toArray();

        result.then(async (rest) => {
          var user1 = rest;
          var user2 = user1[0];
          if (user2) {
            return res.status(401).json({ error: "Username Already Exists!!" });
          }
          const category = "user";
          console.log(category);
          const first_name = "User First Name";
          const last_name = "User Last Name";

          const salt = await bcrypt.genSalt(10);
          var hashedPassword = await bcrypt.hash(user_passkey, salt);
          const user = {
            user_id,
            user_passkey: hashedPassword,
            category: category,
            first_name,
            last_name,
          };
          const token = jwt.sign({ user_id: user.user_id }, "SE_Project_24", {
            expiresIn: "72000s",
          });

          res.status(200).json({ token, user_id, category });
          await res2.insertOne(user); // Insert the user into the UserAuth collection
          // return res
          //   .status(201)
          //   .json({ success: "User Created Successfully!!" });
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const searchTerm = req.body.user_id;
    const user_passkey = req.body.user_passkey;
    const conn = connectDB;
    conn.then((res1) => {
      const res2 = res1.db("SE_Project").collection("UserAuth");
      const query = {};
      query.user_id = new RegExp(`\\b${searchTerm}\\b`, "i");

      const cursor = res2.find(query);
      const result = cursor.toArray();

      result.then(async (rest) => {
        var user1 = rest;
        var user = user1[0];
        if (!user) {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }
        const salt = await bcrypt.genSalt(10);
        var password = await bcrypt.hash(user.user_passkey, salt);
        const passwordMatch = await bcrypt.compare(
          user_passkey,
          user.user_passkey
        );

        if (!passwordMatch) {
          console.log("inside the password mismatch");
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }
        const category = user.category;
        //console.log(category);
        const user_id = user.user_id;
        const token = jwt.sign({ user_id: user.user_id }, "SE_Project_24", {
          expiresIn: "72000s",
        });

        res.status(200).json({ token, user_id, category });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/count-users", async (req, res) => {
  try {
    const conn = connectDB;
    conn.then(async (client) => {
      const db = client.db("SE_Project");
      const collection = db.collection("UserAuth");

      const count = await collection.countDocuments({ category: "user" });

      res.status(200).json({ count });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
