const CleanBlog = require("../models/CleanBlog");

exports.getAboutPage = (req, res) => {
  res.render("about");
};

exports.getAddBlogPage = (req, res) => {
  res.render("add_post");
};

exports.getEditBlogPage = async (req, res) => {
  const blog = await CleanBlog.findOne({ _id: req.params.id });
  res.render("edit", {
    blog,
  });
};