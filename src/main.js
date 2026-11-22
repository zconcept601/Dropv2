import {sb} from './services/supabase.js';
import {loadSession} from './services/auth.js';
import {state} from './contexts/state.js';
import {app, setNav, loading} from './components/ui.js';
import {authView} from './pages/auth.js';
import {home} from './pages/home.js';
import {community} from './pages/community.js';
import {publish} from './pages/publish.js';
import {detail} from './pages/detail.js';
import {contacts} from './pages/contacts.js';
import {activity} from './pages/activity.js';
import {wallet} from './pages/wallet.js';
import {profile} from './pages/profile.js';
import {admin} from './pages/admin.js';
import {soon} from './pages/soon.js';

const ROUTES = {'':home, community, publish, contacts, activity, wallet, profile, admin, p:detail, m:soon};

async function route() {
  if (!state.me) return authView(boot);
  setNav();
  const [, k = '', a, b] = (location.hash || '#/').split('/');
  if (k === 'admin' && !state.isAdmin) { app.innerHTML = '<p class="card">Accès refusé : réservé aux administrateurs.</p>'; return; }
  const fn = ROUTES[k];
  if (!fn) { app.innerHTML = '<p class="card">Page introuvable.</p>'; return; }
  loading();
  try { await fn(a, b); }
  catch (_) { app.innerHTML = '<p class="card">Impossible de charger cet écran. Vérifiez votre connexion puis réessayez.</p>'; }
}
async function boot() { const s = await loadSession(); state.me = s.user; state.isAdmin = s.admin; route(); }

window.addEventListener('hashchange', route);
sb.auth.onAuthStateChange(ev => { if (ev === 'SIGNED_OUT') { state.me = null; state.isAdmin = false; route(); } });
boot();
