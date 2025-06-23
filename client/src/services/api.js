/** Lit le cookie `csrf_token` */
function getCsrfFromCookie() {
  const match = document.cookie.match(/(?:^|; )csrf_token=([^;]+)/);
  console.log('CSRF token client:', match && match[1]);
  return match ? decodeURIComponent(match[1]) : null;
}

// Inscription anonyme — inclut désormais le header CSRF
export async function anonymousLogin(nickname = '') {
  const csrfToken = getCsrfFromCookie();
  const res = await fetch('/api/auth/anonymous', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify({ nickname })
  });
  if (!res.ok) throw new Error(`Login échoué : ${res.status}`);
  return res.json();
}

// Envoi des préférences pour matchmaking
export async function postFilters(user_uuid, filters) {
  const csrfToken = getCsrfFromCookie();
  const res = await fetch('/api/filters', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify({ user_uuid, filters })
  });
  if (!res.ok) throw new Error(`Filters échouées : ${res.status}`);
  return res.json();
}

// Vérification health
export async function healthCheck() {
  const res = await fetch('/api/health', { credentials: 'include' });
  return res.ok;
}
