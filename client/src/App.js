// client/src/App.js

import React, { useContext } from 'react';
import { anonymousLogin, postFilters } from './services/api';
import CookieBanner from './components/CookieBanner';
import Login from './components/Login';
import ProfileUpload from './components/ProfileUpload';
import PreferencesForm from './components/PreferencesForm';
import CallRoom from './components/CallRoom';
import RgpdAdmin from './components/RgpdAdmin';
import { AppContext } from './context/AppContext';

export default function App() {
  const { userUUID, setUserUUID, roomID, setRoomID } = useContext(AppContext);

  // 1. Inscription / connexion anonyme
  const handleLogin = async nickname => {
    const { user_uuid } = await anonymousLogin(nickname);
    setUserUUID(user_uuid);
  };

  // 2. Envoi des préférences et matchmaking
  const handlePref = async filters => {
    const result = await postFilters(userUUID, filters);
    if (result.matched) {
      setRoomID(result.room_id);
    }
    return result;
  };

  // 3. Navigation selon l'état
  if (!userUUID) {
    return <Login onLogin={handleLogin} />;
  }

  if (!roomID) {
    return (
      <>
        <CookieBanner />
        <ProfileUpload />
        <PreferencesForm onSubmit={handlePref} />
      </>
    );
  }

  // 4. Quand on est en appel, afficher la salle
  if (roomID) {
    return <CallRoom />;
 }

  // 5. Après l'appel, afficher la gestion RGPD
  return <RgpdAdmin />;
}
