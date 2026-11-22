import {sb,q} from '../services/supabase.js';
import {esc,fcfa,dt,norm,mail} from '../utils/format.js';
import {app,nav,toast} from '../components/ui.js';
import {state} from '../contexts/state.js';

export async function profile(){
  const p=await q(sb.from('profiles').select('*').eq('id',state.me.id).single());
  app.innerHTML=`<h1>Profil</h1><form id="f" class="card"><label>Nom complet<input id="a" value="${esc(p.full_name)}" required></label>
  <label>Titre professionnel<input id="b" value="${esc(p.professional_title||'')}"></label><label>Ville<input id="c" value="${esc(p.city||'')}"></label>
  <label>À propos<textarea id="d" rows="3">${esc(p.bio||'')}</textarea></label><p class="mut">Téléphone : ${esc(p.phone||'')} (non visible publiquement)</p>
  <button class="full">Enregistrer</button></form><a class="card" href="#/wallet">Portefeuille</a>${state.isAdmin?'<a class="card" href="#/admin">Administration</a>':''}
  <button class="alt full" id="out">Se déconnecter</button>`;
  document.getElementById('f').onsubmit=async e=>{e.preventDefault();
    try{await q(sb.from('profiles').update({full_name:a.value.trim(),professional_title:b.value.trim()||null,city:c.value.trim()||null,bio:d.value.trim()||null}).eq('id',state.me.id));toast('Profil enregistré.')}catch(_){}};
  document.getElementById('out').onclick=async()=>{await sb.auth.signOut()};
}
