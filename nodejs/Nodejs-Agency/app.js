const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const fileUpload = require("express-fileupload");
const { body, validationResult } = require("express-validator");

const User = require("./models/User");
const Portfolio = require("./models/Portfolio");

const authMiddleware = require("./middlewares/authMiddleware");

const port = 5000;

const app = express();

dotenv.config();
app.set("view engine", "ejs");
mongoose
  .connect(process.env.APP_MONGODB_FULL_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.APP_MONGO_DB_NAME,
  })
  .catch((err) => console.log("HATA: MongoBD bağlantısı yapılamadı: ", err));

// Middleware
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
      dbName: process.env.APP_MONGO_DB_NAME,
    }),
  })
);

app.get("/login", async (req, res) => {
  const user = await User.findOne({});
  const login = user ? true : false;

  if (!req.session.userID)
    res.status(200).render("login", { pageName: "login", login: login });
  else res.redirect("/");
});

app.post(
  "/login",
  [
    body("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Enter correct email address."),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Enter password.")
      .isLength({ min: 5 })
      .withMessage("The password lenght must be bigger tahn 5"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).redirect("/");
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          req.session.userID = user._id;
          res.status(200).redirect("/");
        } else {
          res.status(400).render("login", { pageName: "login", login: false });
        }
      });
    } else res.status(400).render("login", { pageName: "login", login: false });
  }
);

app.get("/logout", (req, res) => {
  req.session.userID = null;
  res.status(200).redirect("/");
});

app.get("/register", async (req, res) => {
  const user = await User.findOne({});
  const login = user ? true : false;

  if (!req.session.userID)
    res.status(200).render("register", { pageName: "register", login: login });
  else res.redirect("/");
});

app.post(
  "/register",
  [
    body("email").not().isEmpty().withMessage("Enter the email address."),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Enter the password")
      .isLength({ min: 5 })
      .withMessage("The password length must be greater than 5"),
    body("password-confirm").custom((value, { req }) => {
      if (req.body.password !== value)
        throw new Error("Password confirmation does not match password");
      else return true;
    }),
  ],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      res.redirect("/");
    } else {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        res.redirect("/login");
      } else {
        const userInfo = {
          email: req.body.email,
          password: req.body.password,
        };
        const newUser = await User.create(userInfo);
        if (newUser) res.status(201).redirect("/login");
        else
          res
            .status(400)
            .render("login", { pageName: "login", login: false });
      }
    }
  }
);




app.get("/portfolios/delete/:id", authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (portfolio) {
      const photo = __dirname + "/public/uploads/" + portfolio.photo;
      fs.unlink(photo, async (err) => {
        if (err) res.redirect("/");
        else {
          await Portfolio.findByIdAndRemove(portfolio._id);
          res.status(200).redirect("/");
        }
      });
    }
  } catch (err) {
    res.status(400).redirect("/");
  }
});

app.post(
  "/portfolios",
  [
    body("title").not().isEmpty(),
    body("brief").not().isEmpty(),
    body("client").not().isEmpty(),
    body("category").not().isEmpty(),
    body("description").not().isEmpty(),
    body("photo").not().isEmpty(),
  ],
  authMiddleware,
  async (req, res) => {
    if (validationResult(req)) res.redirect("/");

    const photo = req.files.photo;
    const file = photo.name;
    const portfolioInfo = {
      title: req.body.title,
      brief: req.body.brief,
      client: req.body.client,
      category: req.body.category,
      description: req.body.description,
      photo: file,
    };
    const photoPath = __dirname + "/public/uploads/" + file;
    const uploadsDir = __dirname + "/public/uploads";

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdir(uploadsDir);
    }

    photo.mv(photoPath, async (err) => {
      if (err) {
        res.status(400).redirect("/");
      } else {
        await Portfolio.create(portfolioInfo);
        res.render("index", { pageName: "home", userID: req.session.userID });
      }
    });
  }
);

app.get("/", async (req, res) => {
  const portfolios = await Portfolio.find({});
  res.render("index", {
    pageName: "home",
    userID: req.session.userID,
    portfolios,
  });
});

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log("Sunucu başarı ile başlatıldı.");
});
