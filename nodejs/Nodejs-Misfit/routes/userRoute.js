const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.route("/login").post(authController.loginUser);
router.route("/register").post(authController.registerUser);
router.route("/logout").post(authController.logoutUser);


router.get("/dashboard", (req, res) => {
  console.log("Role:", req.session.user.role); // Add this line
  if (req.session.user.role === "antrenor") {
    res.render("dashboard", { user: req.session.user });
  } else {
    res.redirect("/"); // Redirect to home page if the user is not logged in as an antrenor
  }
});
  

module.exports = router