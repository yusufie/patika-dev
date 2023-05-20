const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PortfolioSchema = Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  brief: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true,
  },
  client: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    trim: true,
    require: true,
  },
});

// PortfolioSchema.pre("validate", function (next) {
//   const file = this.file.split(".");
//   const fileName = slugify(file[0], {
//     lower: true,
//     scrict: true,
//   });
//   this.file = `${fileName}.${file[1]}`;
//   next();
// });

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;
