export const protegerRuta = (req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;
    return next();
  } else {
    res.redirect("/login");
  }
};
