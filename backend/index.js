const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const cors = require('./config/cors');
const csrf = require('./config/csrf');
const csrfMiddleware = require('./middlewares/csrfMiddleware');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

// 1. Connexion à MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// 2. Socket.IO
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000', credentials: true }
});
app.set('io', io);

// 3. Middlewares avant CSRF
app.use(cors);
app.use(express.json());
app.use(cookieParser());

// 4. Routes non protégées
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload-profile', require('./routes/upload'));

// 5. Activation du CSRF
app.use(csrf);
app.use(csrfMiddleware);

// 6. Endpoints de vérification
app.get('/api/csrf',    (req, res) => res.json({ csrfToken: req.csrfToken() }));
app.get('/api/health',  (req, res) => res.sendStatus(200));
app.get('/api/ping',    (req, res) => res.json({ message: 'pong' }));

// 7. Routes protégées par session cookie + JWT
const authMw = require('./middlewares/auth');
app.use('/api/session',     authMw, require('./routes/session'));
app.use('/api/filters',     authMw, require('./routes/filters'));
app.use('/api/voice-notes', authMw, require('./routes/voice'));
app.use('/api/rgpd',        authMw, require('./routes/rgpd'));

// 8. Fichiers uploadés
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// 9. Signaling WebRTC
require('./services/webRTC')(io);

// 10. Gestion des erreurs
app.use(errorHandler);

// Démarrage
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
