// server/controllers/authController.js

const { v4: uuidv4 } = require('uuid');
const Session = require('../models/Session');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshToken');
require('dotenv').config();

// --- Module 1 : connexion anonyme via cookie/session ---
exports.anonymous = async (req, res, next) => {
  try {
    const nickname = req.body.nickname || 'Anonyme';
    const user_uuid = uuidv4();
    const session_id = uuidv4();
    const now = Date.now();
    const expiresAt = new Date(now + 7 * 24 * 3600 * 1000); // 7 jours

    // Création user + session
    await User.create({ user_uuid, nickname });
    await Session.create({ session_id, user_uuid, expiresAt });

    // Envoi du cookie de session
    res.cookie('session_id', session_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 3600 * 1000
    });

    return res.json({ user_uuid });
  } catch (err) {
    next(err);
  }
};

// --- Helpers pour JWT ---
function parseDuration(str) {
  const num = parseInt(str, 10);
  if (str.endsWith('d')) return num * 24 * 60 * 60 * 1000;
  if (str.endsWith('h')) return num * 60 * 60 * 1000;
  if (str.endsWith('m')) return num * 60 * 1000;
  return num * 1000;
}

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

async function signRefreshToken(userUUID) {
  const token = jwt.sign({ userUUID }, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES_IN
  });
  const expiresAt = new Date(Date.now() + parseDuration(process.env.REFRESH_EXPIRES_IN));
  await new RefreshToken({ token, userUUID, expiresAt }).save();
  return token;
}

// --- Module 2 : authentification JWT ---

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { username } = req.body;
    // Pour l'exercice, on utilise simplement le pseudo comme identifiant
    const userUUID = username;
    const accessToken = signAccessToken({ userUUID });
    const refreshToken = await signRefreshToken(userUUID);

    // Stockage du refresh token en cookie HttpOnly
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: parseDuration(process.env.REFRESH_EXPIRES_IN)
    });

    // On renvoie l'access token dans le corps de la réponse
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/refresh
exports.refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    const stored = await RefreshToken.findOne({ token });
    if (!stored || stored.expiresAt < new Date()) return res.sendStatus(403);

    const { userUUID } = jwt.verify(token, process.env.JWT_SECRET);
    const accessToken = signAccessToken({ userUUID });
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/logout
exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      // Révoquer en supprimant le refresh token de la base
      await RefreshToken.deleteOne({ token });
      res.clearCookie('refreshToken');
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
