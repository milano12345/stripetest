if (process.env.NODE_ENV !== "production") {
  dotenv = require("dotenv");
  dotenv.config();
}

const StripeSecretKey = process.env.STRIPE_SECRET_KEY;
const StripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.listen(3000);
