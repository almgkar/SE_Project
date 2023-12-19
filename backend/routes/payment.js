const express = require("express");
const router = express.Router();
const connectDB = require("./../models/_db");
const moment = require("moment");

router.post("/", async (req, res) => {
  try {
    const { username, amount, cardetails } = req.body;
    const timestamp = moment().format();

    const client = await connectDB;
    const db = client.db("SE_Project");
    const paymentCollection = db.collection("payments_db");

    const paymentRecord = {
      user_id: username,
      amount: amount,
      timestamp: timestamp,
      paymentCardnumber: cardetails,
    };

    const result = await paymentCollection.insertOne(paymentRecord);

    if (result.acknowledged) {
      console.log("Payment record inserted successfully");
      res
        .status(201)
        .json({ success: true, message: "Payment recorded successfully!" });
    } else {
      throw new Error("Failed to insert payment record");
    }
  } catch (error) {
    console.error("Error inserting payment record: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
