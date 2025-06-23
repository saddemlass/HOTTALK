// client/src/components/RgpdAdmin.jsx

import React, { useEffect, useState } from 'react';
import { fetchRgpd, createRgpd, updateRgpd, deleteRgpd } from '../services/rgpdApi';
import RgpdForm from './RgpdForm';
import RgpdList from './RgpdList';

export default function RgpdAdmin() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const data = await fetchRgpd();
      setItems(data);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du chargement du registre RGPD');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async data => {
    await createRgpd(data);
    load();
  };

  const handleUpdate = async data => {
    await updateRgpd(editing._id, data);
    setEditing(null);
    load();
  };

  const handleDelete = async id => {
    if (window.confirm('Supprimer ce traitement ?')) {
      await deleteRgpd(id);
      load();
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Registre RGPD</h2>
      <RgpdForm
        onSubmit={editing ? handleUpdate : handleCreate}
        initial={editing}
        onCancel={() => setEditing(null)}
      />
      <RgpdList items={items} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}
