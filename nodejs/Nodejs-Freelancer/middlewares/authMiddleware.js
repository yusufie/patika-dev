module.exports = (req, res, next) => {
  if (req.session.userID) next();
  else res.status(400).redirect("/");
};
