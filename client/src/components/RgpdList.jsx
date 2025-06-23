// client/src/components/RgpdList.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function RgpdList({ items, onEdit, onDelete }) {
  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(items);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'RGPD');
    const buf = XLSX.write(wb, { bookType: 'csv', type: 'array' });
    saveAs(new Blob([buf]), 'rgpd.csv');
  };

  const exportXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(items);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'RGPD');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf]), 'rgpd.xlsx');
  };

  const exportPDF = () => {
    import('jspdf').then(jsPDF => {
      const doc = new jsPDF.jsPDF();
      items.forEach((item, idx) => {
        doc.text(`${idx + 1}. ${item.name} — ${item.purpose}`, 10, 10 + idx * 10);
      });
      doc.save('rgpd.pdf');
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={exportCSV} style={{ marginRight: '0.5rem' }}>Export CSV</button>
        <button onClick={exportXLSX} style={{ marginRight: '0.5rem' }}>Export XLSX</button>
        <button onClick={exportPDF}>Export PDF</button>
      </div>
      <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {items[0] && Object.keys(items[0]).map(key => <th key={key}>{key}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              {Object.entries(item).map(([k, v]) => (
                <td key={k}>{Array.isArray(v) ? v.join(', ') : v}</td>
              ))}
              <td>
                <button onClick={() => onEdit(item)} style={{ marginRight: '0.5rem' }}>✏️</button>
                <button onClick={() => onDelete(item._id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

RgpdList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
