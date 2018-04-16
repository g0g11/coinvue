module.exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports.myProfile = (req, res) => {
  res.send(req.user);
};
