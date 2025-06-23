HOTTALK Application

Présentation

HOTTALK est une application de chat coquin en temps réel, avec un frontend React et un backend Node.js/Express. Elle inclut :

Authentification

Connexion anonyme via cookie de session (session_id).

Authentification JWT (HS256) avec accessToken et refreshToken (cookie HttpOnly).

Matchmaking & Appel WebRTC

Sélection de centres d’intérêt « Hot ».

Pairing temps réel via Socket.IO.

Appel audio/vidéo direct (SDP, ICE, getUserMedia, RTCPeerConnection).

Enregistrement vocal éphémère (MediaRecorder).

RGPD & Cookies

Bannière cookies RGPD-compliant (WCAG, ARIA).

Blocage conditionnel des scripts tiers selon le consentement.

Upload de profil

Composant React pour envoyer et afficher un avatar (Multer + stockage local).

Cartographie des traitements RGPD

CRUD complet d’un registre RGPD /api/rgpd protégé par JWT.

UI React (RgpdForm, RgpdList, RgpdAdmin) avec export CSV/XLSX/PDF.

Installation des dépendances

Backend (server/)

cd server
npm install express mongoose socket.io cors cookie-parser csurf uuid jsonwebtoken multer dotenv
npm install --save-dev nodemon eslint jest supertest

Frontend (client/)

cd client
npm install react react-dom react-scripts socket.io-client web-vitals prop-types file-saver xlsx jspdf
npm install --save-dev eslint jest

Scripts

Backend

npm run dev : démarre le serveur avec nodemon.

npm test : lance les tests Jest.

npm run lint : analyse ESLint.

Frontend

npm start : démarre le client React.

npm test : lance les tests React.

npm run lint : analyse ESLint.

Organisation du code

Backend

config/ : configuration MongoDB, CORS, CSRF.

models/ : Mongoose models (User, Session, RefreshToken, RGPDEntry).

controllers/ : logique métier (authController, sessionController, filterController, voiceController, rgpdController, uploadController).

routes/ : déclaration des routes REST.

middlewares/auth.js : vérification session cookie + JWT Bearer.

services/webRTC.js : matchmaking et signaling WebRTC.

index.js : point d’entrée, montage des middlewares et des routes.

Frontend

components/ : composants React (Login, CookieBanner, ProfileUpload, PreferencesForm, CallRoom, RgpdForm, RgpdList, RgpdAdmin).

context/AppContext.jsx : gestion globale de userUUID et roomID.

services/api.js : appels REST pour auth, filters, session, RGPD.

App.js : navigation conditionnelle selon l’état (login → préférences → appel → RGPD).

Fonctionnalités détaillées

1. Connexion anonyme & JWT

POST /api/auth/anonymous : génère user_uuid, session_id, stocke en base, envoie session_id en cookie HttpOnly.

POST /api/auth/login : génère accessToken (exp. courte) et refreshToken (exp. longue), stocke en base & cookie.

POST /api/auth/refresh : renouvèle accessToken si refreshToken valide.

POST /api/auth/logout : révoque le refreshToken (suppression en base + cookie).

Middleware auth.js : protège toutes les routes métier (/api/session, /api/filters, /api/voice-notes, /api/rgpd).

2. Matchmaking & WebRTC

POST /api/filters : envoie filters (centres d’intérêt), renvoie { matched, room_id }.

Socket.IO : gère la file d’attente et le pairing.

Client : hook useWebRTC pour RTCPeerConnection, UI CallRoom.

Contrôles : mute, vidéo, quitter, messages vocaux éphémères.

3. RGPD & Cookies

CookieBanner : accessible, WCAG contrast, ARIA, stocke consentement (localStorage + cookie).

Blocage : conditionne scripts analytics/publicité selon consentement.

4. Upload de profil

Multer : route POST /api/upload-profile, stockage dans public/uploads.

ProfileUpload : composant React, aperçu image.

5. Cartographie RGPD

Model RGPDEntry (Art.30 RGPD).

Routes CRUD protégé JWT.

Components :

RgpdForm : formulaire ajout/modification.

RgpdList : tableau des entrées + export CSV/XLSX/PDF (file-saver, xlsx, jsPDF).

RgpdAdmin : orchestration des API et du state.

Astuce : pour tester l’UI RGPD sans passer par l’appel WebRTC, dans App.js, commente la ligne :

return <CallRoom />;

et décommente :
return <RgpdAdmin />;