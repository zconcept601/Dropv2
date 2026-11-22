import {sb,q} from '../services/supabase.js';
import {esc,fcfa,dt,norm,mail} from '../utils/format.js';
import {app,nav,toast} from '../components/ui.js';
import {state} from '../contexts/state.js';

export async function wallet(){
  const [w,t]=await Promise.all([sb.from('wallets').select('balance').maybeSingle(),sb.from('wallet_transactions').select('*').order('created_at',{ascending:false}).limit(50)]);
  app.innerHTML=`<a href="#/activity">← Retour</a><h1>Portefeuille</h1><div class="card hero"><small>Solde</small><b>${fcfa(w.data?.balance)}</b>
  <small>Le rechargement par Mobile Money sera ajouté prochainement.</small></div><h2>Historique</h2>
  ${(t.data||[]).map(x=>`<div class="card row"><div>${esc(x.description||x.transaction_type)}<br><span class="mut">${dt(x.created_at)} · ${esc(x.status)}</span></div><b>${['credit','refund','commission'].includes(x.transaction_type)?'+':'−'}${fcfa(x.amount)}</b></div>`).join('')||'<p class="card mut">Aucune opération.</p>'}`;
}
