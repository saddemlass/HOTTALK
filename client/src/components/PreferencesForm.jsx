import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/PreferencesForm.css';

export default function PreferencesForm({ onSubmit }) {
  const CATEGORIES = ['Voix grave', 'ASMR', 'Cosplay'];
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const toggle = (cat) => {
    setSelected(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const { matched } = await onSubmit(selected);
    if (!matched) {
      // pas de match tout de suite → on passe en attente
      setWaiting(true);
      // on ne réactive pas le bouton
      return;
    }
    // match trouvé → form se démonte, on peut arrêter le loading
    setLoading(false);
  };

  return (
    <form className="pref-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Choisissez vos centres d'intérêt « Hot » :</legend>
        {CATEGORIES.map(cat => (
          <label key={cat}>
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => toggle(cat)}
            />
            {cat}
          </label>
        ))}
      </fieldset>

      {/* Affiche “En attente…” si on a déjà cliqué et pas de match */}
      {waiting && (
        <p className="waiting">En attente d’un match…</p>
      )}

      <button
        type="submit"
        className="btn validate"
        disabled={loading || waiting}
      >
        {loading 
          ? 'Patiente…' 
          : waiting 
            ? 'En attente…' 
            : 'Valider'}
      </button>
    </form>
  );
}

PreferencesForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
