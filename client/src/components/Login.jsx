import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';

export default function Login({ onLogin }) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(nickname);
    } catch {
      setError('Erreur lors de la connexion');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Connecte-toi</h2>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Ton pseudo"
        required
      />
      <button type="submit" className="btn login">Entrer</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
