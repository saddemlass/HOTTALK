import React, { useState, useEffect } from 'react';
import '../styles/CookieBanner.css';

const CATEGORIES = ['Nécessaires', 'Préférences', 'Analytics', 'Marketing'];

export default function CookieBanner() {
  const [consent, setConsent] = useState(null);
  const [openSettings, setOpenSettings] = useState(false);
  const [choices, setChoices] = useState({});

  // Au montage, récupérer le consentement existant
  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent');
    if (stored) {
      setConsent(JSON.parse(stored));
    }
  }, []);

  // Accepter tout
  const acceptAll = () => {
    const all = CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: true }), {});
    saveConsent(all);
  };

  // Refuser tout (laisser nécessaires à true)
  const rejectAll = () => {
    const rej = CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: cat === 'Nécessaires' }), {});
    saveConsent(rej);
  };

  // Enregistrer en localStorage + state
  const saveConsent = obj => {
    localStorage.setItem('cookie_consent', JSON.stringify(obj));
    setConsent(obj);
    setChoices({});
    setOpenSettings(false);
  };

  // Sauvegarde catégorie par catégorie
  const toggleCategory = cat => {
    setChoices(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  // Interface principale
  if (consent) return null;

  return (
    <div className="cookie-banner">
      {!openSettings ? (
        <>
          <p>Nous utilisons des cookies pour optimiser votre expérience.</p>
          <div className="buttons">
            <button onClick={acceptAll}>Tout accepter</button>
            <button onClick={rejectAll}>Tout refuser</button>
            <button onClick={() => setOpenSettings(true)}>Paramétrer</button>
          </div>
          <a href="/privacy">Voir la politique de confidentialité</a>
        </>
      ) : (
        <>
          <fieldset>
            <legend>Choisissez par catégorie :</legend>
            {CATEGORIES.map(cat => (
              <label key={cat}>
                <input
                  type="checkbox"
                  checked={choices[cat] ?? false}
                  disabled={cat === 'Nécessaires'}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </fieldset>
          <div className="buttons">
            <button onClick={() => saveConsent(choices)}>Valider</button>
            <button onClick={() => setOpenSettings(false)}>Annuler</button>
          </div>
        </>
      )}
    </div>
  );
}
