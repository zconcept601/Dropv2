import {sb,q} from '../services/supabase.js';
import {esc,fcfa,dt,norm,mail} from '../utils/format.js';
import {app,nav,toast} from '../components/ui.js';
import {state} from '../contexts/state.js';

export async function admin(){
  const [o,s,m,l]=await Promise.all([sb.from('offers').select('*').eq('status','pending'),sb.from('searches').select('*').eq('status','pending'),
    sb.from('profiles').select('id,full_name,phone,account_status').order('created_at',{ascending:false}).limit(50),sb.from('admin_logs').select('*').order('created_at',{ascending:false}).limit(15)]);
  const P=[...(o.data||[]).map(x=>({...x,k:'offer'})),...(s.data||[]).map(x=>({...x,k:'search'}))];
  app.innerHTML=`<a href="#/profile">← Profil</a><h1>Administration</h1><h2>À valider (${P.length})</h2>
  ${P.map(x=>`<div class="card"><span class="tag${x.k==='search'?' s':''}">${x.k==='offer'?'Offre':'Recherche'}</span><b>${esc(x.title)}</b><p class="mut">${esc(x.description)}</p>
   <button data-m="approved" data-k="${x.k}" data-i="${x.id}">Valider</button><button class="bad" data-m="rejected" data-k="${x.k}" data-i="${x.id}">Refuser</button></div>`).join('')||'<p class="card mut">Rien en attente.</p>'}
  <h2>Membres</h2>${(m.data||[]).map(x=>`<div class="card"><b>${esc(x.full_name)}</b> <span class="mut">${esc(x.phone||'')} · ${esc(x.account_status)}</span><br>
   <button class="alt" data-cr="${x.id}">Créditer</button><button class="alt" data-su="${x.id}" data-s="${x.account_status==='active'?'suspended':'active'}">${x.account_status==='active'?'Suspendre':'Réactiver'}</button></div>`).join('')}
  <h2>Journal</h2>${(l.data||[]).map(x=>`<div class="card mut">${dt(x.created_at)} · ${esc(x.action)}</div>`).join('')}`;
  app.querySelectorAll('[data-m]').forEach(b=>b.onclick=async()=>{let why=null;
    if(b.dataset.m==='rejected'){why=prompt('Motif du refus ?');if(!why)return}
    try{await q(sb.rpc('admin_moderate_publication',{p_type:b.dataset.k,p_id:b.dataset.i,p_decision:b.dataset.m,p_reason:why}));admin()}catch(_){}});
  app.querySelectorAll('[data-cr]').forEach(b=>b.onclick=async()=>{const a=parseInt(prompt('Montant en FCFA ?'),10),ref=prompt('Référence du paiement reçu ?');if(!a||!ref)return;
    try{await q(sb.rpc('admin_credit_wallet',{p_user_id:b.dataset.cr,p_amount:a,p_reference:ref}));toast('Portefeuille crédité.');admin()}catch(_){}});
  app.querySelectorAll('[data-su]').forEach(b=>b.onclick=async()=>{const why=prompt('Motif ?');if(!why)return;
    try{await q(sb.rpc('admin_set_account_status',{p_user_id:b.dataset.su,p_new_status:b.dataset.s,p_reason:why}));admin()}catch(_){}});
}
