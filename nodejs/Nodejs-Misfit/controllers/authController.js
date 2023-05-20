const User = require("../models/User");
const bcrypt = require('bcrypt');


exports.registerUser = async(req,res) => {
    const user = await new User(req.body)
    await user.save()
    res.redirect("/login")

}


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      res.redirect("/login");
      return;
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.redirect("/login");
      return;
    }
  
    req.session.userID = user._id;
    req.session.user = user;
  
    res.redirect("/");
  };
  
  


exports.logoutUser = async(req,res) => {
    req.session.destroy()
    res.redirect("/")
}