const csurf = require('csurf');

module.exports = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // false en dev
    sameSite: 'Strict',
    maxAge: 3600 * 1000  // 1 heure
  }
});
