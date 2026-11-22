import {sb,q} from '../services/supabase.js';
import {esc,fcfa,dt,norm,mail} from '../utils/format.js';
import {app,nav,toast} from '../components/ui.js';
import {state} from '../contexts/state.js';

export async function detail(type,id){
  const r=await q(sb.from(type==='offer'?'offers':'searches').select('*').eq('id',id).single());
  const mine=r.user_id===state.me.id;
  app.innerHTML=`<a href="#/community">← Retour</a><h1>${esc(r.title)}</h1>
  <p><span class="tag${type==='search'?' s':''}">${type==='offer'?'Offre':'Recherche'}</span><span class="tag">${esc(r.category||'Général')}</span><span class="mut">${esc(r.city||'')}</span></p>
  <div class="card">${esc(r.description).replace(/\n/g,'<br>')}</div>
  <p class="mut">Visible jusqu’au ${dt(r.expires_at)}${mine?' · Statut : '+esc(r.status):''}</p>
  ${mine?'<p class="card">Ceci est votre publication.</p>':`<form id="cr" class="card"><label>Message (facultatif)<textarea id="m" rows="3"></textarea></label>
  <button class="full">Demander une mise en relation</button>
  <p class="mut">Vous ne payez rien. Les coordonnées sont partagées si l’auteur accepte.</p></form>`}`;
  if(!mine)document.getElementById('cr').onsubmit=async e=>{e.preventDefault();
    try{await q(sb.from('contact_requests').insert({requester_id:state.me.id,recipient_id:r.user_id,source_type:type,source_id:id,message:m.value.trim()||null}));
    toast('Demande envoyée.');location.hash='#/activity'}catch(_){}};
}
