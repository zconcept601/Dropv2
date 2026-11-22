import {sb,q} from '../services/supabase.js';
import {esc,fcfa,dt,norm,mail} from '../utils/format.js';
import {app,nav,toast} from '../components/ui.js';
import {state} from '../contexts/state.js';

import {STATUS} from '../constants.js';
export async function community() {
  const feed = t => sb.from(t).select('*').eq('status', 'approved').order('created_at', {ascending:false}).limit(30);
  const mine = t => sb.from(t).select('id,title,status,expires_at').eq('user_id', state.me.id).order('created_at', {ascending:false}).limit(20);
  const [o, s, mo, ms] = await Promise.all([feed('offers'), feed('searches'), mine('offers'), mine('searches')]);
  const tab = state.feedTab, list = (tab === 'offer' ? o : s).data || [];
  const my = [...(mo.data || []).map(x => ({...x, k:'offer'})), ...(ms.data || []).map(x => ({...x, k:'search'}))];
  app.innerHTML = `<div class="row"><h1>Communauté</h1><a class="btn" href="#/publish">Publier</a></div>
  <div><button class="${tab === 'offer' ? '' : 'alt'}" data-t="offer">Offres</button><button class="${tab === 'search' ? '' : 'alt'}" data-t="search">Recherches</button></div>
  ${list.map(r => `<a class="card" href="#/p/${tab}/${r.id}"><b>${esc(r.title)}</b><br><span class="tag">${esc(r.category || 'Général')}</span><span class="mut">${esc(r.city || '')}</span>
   <p class="mut" style="margin:6px 0 0">${esc(r.description).slice(0, 110)}</p></a>`).join('') || '<p class="card mut">Aucune publication validée pour le moment. Publiez la première.</p>'}
  <h2>Mes publications</h2>${my.map(x => `<a class="card row" href="#/p/${x.k}/${x.id}"><span>${esc(x.title)}</span><span class="tag s">${esc(STATUS[x.status] || x.status)}</span></a>`).join('') || '<p class="card mut">Vous n’avez rien publié.</p>'}`;
  app.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { state.feedTab = b.dataset.t; community(); });
}
