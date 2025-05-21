export const protegerRuta = (req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;
    return next();
  } else {
    res.redirect("/login");
  }
};

export const protegerSuperAdmin = (req, res, next) => {
  console.log("Usuario en sesión:", req.session.user); // Para debug
  if (req.session.user && req.session.user.role === "superadmin") {
    req.user = req.session.user;
    return next();
  } else {
    res.redirect("/login");
  }
};
