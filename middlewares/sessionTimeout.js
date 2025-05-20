export default function sessionTimeout(req, res, next) {
  const tiempoMaximo = 30 * 60 * 1000; // 30 minutos
  const ahora = Date.now();

  if (req.session.user) {
    if (
      req.session.lastActivity &&
      ahora - req.session.lastActivity > tiempoMaximo
    ) {
      req.session.destroy(() => {
        return res.redirect("/login?error=sesion_expirada");
      });
    } else {
      req.session.lastActivity = ahora;
    }
  }

  next();
}
