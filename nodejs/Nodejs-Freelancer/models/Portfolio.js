const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const PortfolioSchema = Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    photo: {
        type: String,
        require: true,
        trim: true
    }
})

// PortfolioSchema.pre("validate", function(next, {req}) {
//     const portfolio = this;
//     this.photo = req.files.photo.name;
//     next();
// })
const Portfolio = mongoose.model("Portfolie", PortfolioSchema)

module.exports = Portfolio;