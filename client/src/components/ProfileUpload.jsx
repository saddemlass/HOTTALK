import React, { useState } from 'react';
import '../styles/ProfileUpload.css';

export default function ProfileUpload() {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const handleFile = async e => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append('profile', file);

    try {
      const res = await fetch('/api/upload-profile', {
        method: 'POST',
        credentials: 'include',
        body: form
      });
      if (!res.ok) throw new Error(`Upload échoué : ${res.status}`);
      const { url } = await res.json();
      setPreview(url);
    } catch (err) {
      console.error(err);
      setError('Échec de l’upload');
    }
  };

  return (
    <div className="profile-upload">
      <label htmlFor="file">Choisir un fichier</label>
      <input id="file" type="file" accept="image/*" onChange={handleFile} />
      {error && <p className="error">{error}</p>}
      {preview && (
        <div className="preview">
          <img src={preview} alt="Aperçu avatar" />
        </div>
      )}
    </div>
  );
}
