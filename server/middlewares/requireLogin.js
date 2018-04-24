// TODO: not used yet, needs to be implemented in routes!
module.exports = (req, res, next) => {
  if (!req.user) {
    console.log('not logged in', req.user);
    res.redirect('/');
    return res.status(401).send({ error: 'You must log in!' });
  }

  console.log('logged in', req.user);
  next();
};
