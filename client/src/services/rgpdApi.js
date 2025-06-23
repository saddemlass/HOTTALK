// client/src/services/rgpdApi.js

export async function fetchRgpd() {
  const res = await fetch('/api/rgpd', {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  });
  return res.json();
}

export async function createRgpd(data) {
  const res = await fetch('/api/rgpd', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateRgpd(id, data) {
  const res = await fetch(`/api/rgpd/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteRgpd(id) {
  await fetch(`/api/rgpd/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
}
