import {sb,q} from '../services/supabase.js';
import {esc,fcfa,dt,norm,mail} from '../utils/format.js';
import {app,nav,toast} from '../components/ui.js';
import {state} from '../contexts/state.js';

import {MODULES} from '../constants.js';
export async function home() {
  const cnt = (t, f) => { const x = sb.from(t).select('*', {count:'exact', head:true}); return f ? f(x) : x; };
  const live = t => cnt(t, x => x.eq('user_id', state.me.id).eq('status', 'approved').gt('expires_at', new Date().toISOString()));
  const [w, qt, mo, ms, rc, ct, nt, po, ps] = await Promise.all([
    sb.from('wallets').select('balance').maybeSingle(), sb.from('contact_quotas').select('credits').maybeSingle(),
    live('offers'), live('searches'),
    cnt('contact_requests', x => x.eq('recipient_id', state.me.id).eq('status', 'pending')), cnt('contacts'),
    cnt('notifications', x => x.eq('is_read', false)),
    state.isAdmin ? cnt('offers', x => x.eq('status', 'pending')) : {count:0},
    state.isAdmin ? cnt('searches', x => x.eq('status', 'pending')) : {count:0}]);
  const todo = (po.count || 0) + (ps.count || 0);
  app.innerHTML = `<div class="card hero"><small>Mon portefeuille</small><b>${fcfa(w.data?.balance)}</b>
   <small>${qt.data?.credits ?? 0} mises en relation disponibles · <a href="#/wallet">Détails</a></small></div>
  <div class="grid"><a class="card stat" href="#/community"><b>${(mo.count || 0) + (ms.count || 0)}</b><span class="mut">Publications actives</span></a>
  <a class="card stat" href="#/activity"><b>${rc.count || 0}</b><span class="mut">Demandes à traiter</span></a>
  <a class="card stat" href="#/contacts"><b>${ct.count || 0}</b><span class="mut">Contacts obtenus</span></a>
  <a class="card stat" href="#/activity"><b>${nt.count || 0}</b><span class="mut">Notifications non lues</span></a></div>
  ${state.isAdmin ? `<a class="card" href="#/admin"><b>${todo}</b> publication(s) à valider · Administration</a>` : ''}
  <p><a class="btn" href="#/publish">Publier une offre ou une recherche</a></p>
  <h2>Modules</h2><div class="grid">${MODULES.map(m => `<a class="card tile" href="#/${m.status === 'ready' ? m.id : 'm/' + m.id}"><b>${esc(m.name)}</b>
   ${m.status === 'ready' ? '' : '<br><span class="tag s">En préparation</span>'}<p class="mut">${esc(m.desc)}</p></a>`).join('')}</div>`;
}
