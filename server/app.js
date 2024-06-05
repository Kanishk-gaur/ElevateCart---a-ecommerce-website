const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv")
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51O2zCCSIPg36jqFm8CWJ8QGuAsnSUEz7BXQ1PnaDY78jaKoAOIjdPPOZt2E7pRE8KgB18LVzk8JJwjS8zZzkzzR800uHxOBzV3');


const errorMiddleware = require("./middleware/error");


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" })
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

 // Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const { isAuthenticateUser } = require("./middleware/auth");
const catchAsyncErrors = require("./middleware/catchAsyncErrors");
 //const payment = require("./routes/paymentRoute");

 app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
// //app.use("/api/v1", payment);


//For Payment 
app.post("/api/v1/payment/process", isAuthenticateUser, catchAsyncErrors(async (req, res) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },

  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
}))

app.get("/api/v1/stripeapikey", isAuthenticateUser, catchAsyncErrors(async (req, res) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
}))

// app.use(express.static(path.join(__dirname, "/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "/build"));
// });

// const path = require("path");

app.use(express.static(path.join(__dirname, "build"))); // put this line of code in app.js


//middleeware for error
app.use(errorMiddleware)

// app.use(express.json());

module.exports = app