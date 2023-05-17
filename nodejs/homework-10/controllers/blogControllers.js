const CleanBlog = require("../models/CleanBlog");
const fs = require("fs");

exports.getAllBlogs = async (req, res) => {
  const posts = await CleanBlog.find({}).sort("-dateCreated");
  res.render("index", {
    posts: posts,
  });
};

exports.getBlog = async (req, res) => {
  const postdetail = await CleanBlog.findById(req.params.id);
  res.render("post", {
    postdetail: postdetail,
  });
};

exports.createBlogDetail = async (req, res) => {
  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + "/../public/uploads/" + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await CleanBlog.create({
      ...req.body,
      image: "/uploads/" + uploadedImage.name,
    });
    res.redirect("/");
  });
};

exports.updateBlogDetail = async (req, res) => {
  const blog = await CleanBlog.findOne({ _id: req.params.id });
  blog.title = req.body.title;
  blog.detail = req.body.detail;
  blog.save();

  res.redirect(`/posts/${req.params.id}`);
};

exports.deleteBlogDetail = async (req, res) => {
  const blog = await CleanBlog.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/../public" + blog.image;
  fs.unlinkSync(deletedImage);
  await CleanBlog.findByIdAndRemove(req.params.id);
  res.redirect("/");
};