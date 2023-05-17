const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload"); //dosya yükleme
const methodOverride = require("method-override");
const ejs = require("ejs");
const fs = require("fs"); //klasör oluşturma
const pageController = require('./controllers/pageControllers');
const blogController = require('./controllers/blogControllers');

const app = express();
const CleanBlog = require("./models/CleanBlog");

//Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGİNE
app.set("view engine", "ejs");

//MiddleWares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.get("/about", pageController.getAboutPage);
app.get("/add_post", pageController.getAddBlogPage);
app.get("/posts/:id", blogController.getBlog);
app.get("/", blogController.getAllBlogs);
app.post("/blogs", blogController.createBlogDetail);

app.get("/posts/edit/:id", pageController.getEditBlogPage);

app.put("/posts/:id", blogController.updateBlogDetail);

app.delete("/posts/:id", blogController.deleteBlogDetail);

const port = 4000;
app.listen(port, (req, res) => {
  console.log(`Sunucu ${port}'unda başlatıldı`);
});