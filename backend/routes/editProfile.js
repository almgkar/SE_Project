const express = require("express");
const router = express.Router();
const connectDB = require("./../models/_db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.post("/", async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const newProfileData = req.body.newProfileData;

    const conn = connectDB;
    conn.then(async (client) => {
      const db = client.db("SE_Project");
      const collection = db.collection("UserAuth");

      const user = await collection.findOne({ user_id });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const updatedUser = {
        ...user,
        ...newProfileData,
      };

      if (newProfileData.user_passkey) {
        const salt = await bcrypt.genSalt(10);
        updatedUser.user_passkey = await bcrypt.hash(
          newProfileData.user_passkey,
          salt
        );
      }

      await collection.updateOne({ user_id }, { $set: updatedUser });

      res.status(200).json({ success: "Profile updated successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
