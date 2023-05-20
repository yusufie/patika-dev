const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongosStore = require("connect-mongo");
const methodOverride = require("method-override");
const app = express();
const pageRoute = require("./routes/pageRoute");
const userRoute = require("./routes/userRoute");

// app.use
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//mongo connect
mongoose
  .connect("mongodb://127.0.0.1:27017/misfit", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
});
global.userIN = null;
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongosStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/misfit",
    }),
  })
);
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRoute)
app.use("/user", userRoute)

// server
const port = 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });