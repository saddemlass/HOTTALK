// client/src/components/RgpdForm.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function RgpdForm({ onSubmit, initial, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    purpose: '',
    dataCategories: '',
    controller: '',
    processor: '',
    legalBasis: '',
    retention: '',
    destruction: ''
  });

  // Préremplir le formulaire si on édite
  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || '',
        purpose: initial.purpose || '',
        dataCategories: (initial.dataCategories || []).join(', '),
        controller: initial.controller || '',
        processor: initial.processor || '',
        legalBasis: initial.legalBasis || '',
        retention: initial.retention || '',
        destruction: initial.destruction || ''
      });
    }
  }, [initial]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Convertir la chaîne dataCategories en tableau
    const payload = {
      ...form,
      dataCategories: form.dataCategories.split(',').map(s => s.trim())
    };
    onSubmit(payload);
    if (!initial) {
      // Réinitialiser sur création
      setForm({
        name: '',
        purpose: '',
        dataCategories: '',
        controller: '',
        processor: '',
        legalBasis: '',
        retention: '',
        destruction: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{initial ? 'Modifier un traitement' : 'Ajouter un traitement'}</h3>
      <div>
        <label>Name</label><br />
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Purpose</label><br />
        <input name="purpose" value={form.purpose} onChange={handleChange} required />
      </div>
      <div>
        <label>Data Categories (comma-separated)</label><br />
        <input name="dataCategories" value={form.dataCategories} onChange={handleChange} placeholder="e.g. email, name" />
      </div>
      <div>
        <label>Controller</label><br />
        <input name="controller" value={form.controller} onChange={handleChange} required />
      </div>
      <div>
        <label>Processor</label><br />
        <input name="processor" value={form.processor} onChange={handleChange} />
      </div>
      <div>
        <label>Legal Basis</label><br />
        <input name="legalBasis" value={form.legalBasis} onChange={handleChange} required />
      </div>
      <div>
        <label>Retention</label><br />
        <input name="retention" value={form.retention} onChange={handleChange} required />
      </div>
      <div>
        <label>Destruction</label><br />
        <input name="destruction" value={form.destruction} onChange={handleChange} required />
      </div>
      <button type="submit" style={{ marginRight: '0.5rem' }}>
        {initial ? 'Modifier' : 'Ajouter'}
      </button>
      {initial && <button type="button" onClick={onCancel}>Annuler</button>}
    </form>
  );
}

RgpdForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initial: PropTypes.shape({
    name: PropTypes.string,
    purpose: PropTypes.string,
    dataCategories: PropTypes.arrayOf(PropTypes.string),
    controller: PropTypes.string,
    processor: PropTypes.string,
    legalBasis: PropTypes.string,
    retention: PropTypes.string,
    destruction: PropTypes.string
  }),
  onCancel: PropTypes.func
};
