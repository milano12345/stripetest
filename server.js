if (process.env.NODE_ENV !== "production") {
  dotenv = require("dotenv");
  dotenv.config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const helmet = require("helmet")

const express = require("express");
const app = express();
const fs = require("fs");

app.use(helmet())

app.set("view engine", "ejs");
// rnapp.set("views", path.join(__dirname, "views"));
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.static("public"));
app.listen(3000);

app.get("/hello", (req, res) => {
  console.log("server is running");
});

app.get("/store", (req, res) => {
  fs.readFile("items.json", function(error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render("store.ejs", {
        items: JSON.parse(data),
        stripePublicKey: stripePublicKey
      });
    }
  });
});

app.post("/purchase", (req, res) => {
  fs.readFile("items.json", function(error, data) {
    if (error) {
      res
        .status(500)
        .json({ message: "error" })
        .end();
    } else {
      console.log("purchased");
      const itemsJson = JSON.parse(data);
      const itemsArray = itemsJson.music.concat(itemsJson.merch);
      let total = 0;
      req.body.items.forEach(function(item) {
        const itemJson = itemsArray.find(function(i) {
          return i.id == item.id;
        });
        total = total + itemJson.price * item.quantity;
      });
    }
  });
});

module.exports = app;
