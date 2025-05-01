import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const mostrarLogin = (req, res) => {
  res.render("login", { error: null });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render("login", { error: "Credenciales inválidas" });
  }

  req.session.user = user;
  res.redirect("/dashboard");
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/dashboard");
    }
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};
