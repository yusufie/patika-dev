const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const CleanBlogShema = new Schema({
  title: String,
  detail: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const CleanBlog = mongoose.model('CleanBlog', CleanBlogShema);

module.exports = CleanBlog;