import {sb,q} from '../services/supabase.js';
import {esc,fcfa,dt,norm,mail} from '../utils/format.js';
import {app,nav,toast} from '../components/ui.js';
import {state} from '../contexts/state.js';

export async function activity(){
  const [rq,nt,qt]=await Promise.all([sb.from('contact_requests').select('*').order('created_at',{ascending:false}).limit(50),
    sb.from('notifications').select('*').order('created_at',{ascending:false}).limit(30),sb.from('contact_quotas').select('credits').maybeSingle()]);
  const R=(rq.data||[]).filter(r=>r.recipient_id===state.me.id||r.requester_id===state.me.id);
  const st={pending:'En attente',accepted:'Acceptée',rejected:'Refusée',cancelled:'Annulée'};
  app.innerHTML=`<h1>Activité</h1><div class="card"><div class="row"><div><b>${qt.data?.credits??0}</b> mises en relation restantes<br><span class="mut">Au-delà : 100 FCFA pour 5 de plus</span></div><button id="buy">Payer 100 FCFA</button></div></div>
  <h2>Demandes</h2>${R.map(r=>{const rec=r.recipient_id===state.me.id;return `<div class="card"><span class="tag">${rec?'Reçue':'Envoyée'}</span><span class="tag s">${st[r.status]}</span> <span class="mut">${dt(r.created_at)}</span>
   <p>${esc(r.message||'(sans message)')}</p>${r.status==='pending'?(rec?`<button data-a="accepted" data-i="${r.id}">Accepter</button><button class="alt" data-a="rejected" data-i="${r.id}">Refuser</button>`:`<button class="alt" data-a="cancelled" data-i="${r.id}">Annuler</button>`):''}</div>`}).join('')||'<p class="card mut">Aucune demande.</p>'}
  <h2>Notifications</h2>${(nt.data||[]).map(n=>`<div class="card ${n.is_read?'':'unread'}"><b>${esc(n.title)}</b><br><span class="mut">${esc(n.message||'')}</span></div>`).join('')||'<p class="card mut">Rien de nouveau.</p>'}`;
  document.getElementById('buy').onclick=async()=>{if(!confirm('Débiter 100 FCFA de votre portefeuille pour 5 mises en relation ?'))return;try{await q(sb.rpc('buy_contact_credits'));toast('5 mises en relation ajoutées.');activity()}catch(_){}};
  app.querySelectorAll('[data-a]').forEach(b=>b.onclick=async()=>{if(b.dataset.a==='accepted'&&!confirm('Accepter ? Un crédit de mise en relation sera utilisé.'))return;try{await q(sb.from('contact_requests').update({status:b.dataset.a}).eq('id',b.dataset.i));activity()}catch(_){}});
  if((nt.data||[]).some(n=>!n.is_read))sb.from('notifications').update({is_read:true}).eq('is_read',false).then(()=>{});
}
