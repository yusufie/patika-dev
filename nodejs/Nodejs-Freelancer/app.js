const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const fileUpload = require("express-fileupload");
const randomstring = require("randomstring");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("./models/User");
const Portfolio = require("./models/Portfolio");

const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const port = process.env.port || 5000;

// Ortam değişkenlerini ayarla
dotenv.config();
mongoose
  .connect(process.env.APP_MONGODB_FULL_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.APP_MONGODB_DB_NAME,
  })
  .catch((err) => console.log("HATA: MongoBD bağlantısı yapılamadı: ", err));
global.userIN = null;

// Set view engine
app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  // session aç
  session({
    secret: process.env.APP_SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.APP_MONGODB_FULL_URL,
      dbName: process.env.APP_MONGODB_DB_NAME,
    }),
  })
);
app.use("*", (req, res, next) => {
  if (req.session.userID) global.userIN = req.session.userID;
  next();
});


app.get("/register", async (req, res) => {
  const user = await User.findOne({});
  const login = user ? true : false;
  res.status(200).render("register", {
    pageName: "register",
    login: login,
    errors: null,
  });
});


app.get(
  "/login",
  [
    body("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Enter a correct email address!"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Enter a password")
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    const user = await User.findOne({});
    const login = user ? true : false;
    res.status(200).render("login", {
      pageName: "login",
      login: login,
      errors: null,
    });
  }
);

app.post(
  "/login",
  [
    body("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Enter a corret email address"),
    body("password")
      .not()
      .isEmpty()
      .isLength({ min: 5 })
      .withMessage("Enter a password"),
    body("confirm-password").custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password confirmation does not match password.");
      else return true;
    }),
  ],
  async (req, res) => {
    const user = await User.findOne({});
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          req.session.userID = user._id;
          res.status(200).redirect("/");
        } else {
          res.status(400).render("login", {
            pageName: "login",
            login: true,
            errors: "Something goes wrong!",
          });
        }
      });
    } else {
      res.status(400).redirect("/");
    }
  }
);

app.get("/logout", (req, res) => {
  req.session.userID = null;
  global.userIN = null;
  res.status(200).redirect("/");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User already exists
      res.status(400).redirect("/");
    } else {
      // Create a new user
      const newUser = new User({ email, password });
      await newUser.save();

      res.status(201).redirect("/login");
    }
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).redirect("/");
  }
});


app.post(
  "/portfolies",
  authMiddleware,
  [
    body("title").not().isEmpty().withMessage("Enter a portfolio title."),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Enter a description.")
      .custom((value, { req }) => {
        if (!req.files.photo) throw new Error("Select a photo.");
        else return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const file = req.files.photo;
    const uploadDir = `${__dirname}/public/uploads`;
    if (!fs.existsSync(uploadDir)) {
      fs.mkdir(`${__dirname}/public/uploads`, (err) => {
        if (err) res.status(500).redirect("/");
        return;
      });
    }

    if (errors.isEmpty()) {
      const photoFile = `${randomstring.generate()}.${
        req.files.photo.name.split(".")[1]
      }`;
      const path = `${__dirname}/public/uploads/${photoFile}`;
      file.mv(path, async (err) => {
        if (err) res.status(500).redirect("/");
        else {
          const portfolioInfo = {
            title: req.body.title,
            description: req.body.description,
            photo: photoFile,
          };
          await Portfolio.create(portfolioInfo);
          res.status(201).redirect("/");
        }
      });
    } else {
      const portfolies = await Portfolio.find({});
      console.log(errors);
      res.status(400).render("index", {
        pageName: "home",
        portfolies,
        errors: errors,
      });
    }
  }
);

app.post("/portfolies/update/:id", authMiddleware, [
  body("title").not().isEmpty().withMessage("Enter a portfolio title."),
  body("description").not().isEmpty().withMessage("Enter a description."),
], async (req, res) => {
  const errors = validationResult(req);
  const id = req.params.id;
  const { title, description } = req.body;

  if (errors.isEmpty()) {
    try {
      const portfolio = await Portfolio.findById(id);
      if (!portfolio) {
        res.status(404).redirect("/");
        return;
      }

      portfolio.title = title;
      portfolio.description = description;
      await portfolio.save();

      res.status(200).redirect("/");
    } catch (err) {
      console.error(err);
      res.status(500).redirect("/");
    }
  } else {
    const portfolies = await Portfolio.find({});
    res.status(400).render("index", {
      pageName: "home",
      portfolies,
      errors: errors.array(),
    });
  }
});


app.get("/portfolies/update/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  // Fetch the portfolio item with the specified ID from the database
  const portfolio = await Portfolio.findById(id);

  if (!portfolio) {
    // If the portfolio item doesn't exist, redirect to the homepage or display an error
    res.status(404).redirect("/");
    return;
  }

  // Render the update page and pass the portfolio item to the template
  res.status(200).render("update", {
    pageName: "update",
    portfolio: portfolio,
    errors: null,
  });
});


app.get("/portfolies/delete/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const portfolio = await Portfolio.findById(id);

  if (!portfolio) {
    res.status(400).redirect("/");
    return;
  }

  const photo = `${__dirname}/public/uploads/${portfolio.photo}`;

  fs.unlink(photo, async (err) => {
    if (!err) {
      await Portfolio.findByIdAndRemove(id);
      res.status(200).redirect("/");
    } else {
      const portfolies = await Portfolio.find({});
      res.status(500).render("index", {
        pageName: "home",
        portfolies,
        errors: "Somethings goes wrong!",
      });
    }
  });
});

app.get("/", async (req, res) => {
  const portfolies = await Portfolio.find({});
  res.status(200).render("index", {
    pageName: "home",
    portfolies,
    errors: null,
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log("Bir hata oluştu.");
    console.log(err);
  } else console.log(`Sunucu ${port} nolu port üzerinden çalışmaya başladı.`);
});
