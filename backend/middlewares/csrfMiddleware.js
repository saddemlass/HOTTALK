// Envoie le token CSRF dans un cookie lisible par le front
module.exports = (req, res, next) => {
  res.cookie('csrf_token', req.csrfToken(), {
    httpOnly: false,    // le front peut lire document.cookie
    secure: false,      // false en dev
    sameSite: 'Strict',
    maxAge: 3600 * 1000 // 1 heure
    // pas de domain ni path, par défaut même hôte/port que le back
  });
  next();
};
