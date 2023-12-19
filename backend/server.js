const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./models/_db");
const PORT = process.env.PORT || 3001;
const router = express.Router();
const nodemailer = require("nodemailer");

const { getPaymentDb } = require("./models/Payment");

var cors = require("cors");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(express.json());
const searchRoutes = require("./routes/searchRoutes");
const signinRoutes = require("./routes/signinRoutes");
const reserve = require("./routes/reserve");
const userInfoRoutes = require("./routes/userInfoRoutes");
const editProfile = require("./routes/editProfile");
const paymentRouter = require("./routes/payment");
const EmailRouter = require("./routes/send_email");

dotenv.config();

connectDB.then((res) => {
  // console.log(res)
});

app.use(bodyParser.json());

app.use("/search", searchRoutes);
app.use("/login", signinRoutes);
app.use("/reserve", reserve);
app.use("/userInfo", userInfoRoutes);
app.use("/editProfile", editProfile);
app.use("/payment", paymentRouter);
app.use("/send-email", EmailRouter);

module.exports = router;
