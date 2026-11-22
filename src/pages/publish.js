import {sb,q} from '../services/supabase.js';
import {esc,fcfa,dt,norm,mail} from '../utils/format.js';
import {app,nav,toast} from '../components/ui.js';
import {state} from '../contexts/state.js';

export function publish(){
app.innerHTML=`<h1>Publier</h1><form id="f" class="card"><label>Type<select id="t"><option value="offer">Je propose (offre, service)</option><option value="search">Je cherche (fournisseur, prestataire)</option></select></label>
<label>Titre<input id="ti" required maxlength="120"></label><label>Description<textarea id="d" rows="5" required></textarea></label>
<label>Catégorie<input id="c" placeholder="Électroménager, transport…"></label><label>Ville<input id="v" placeholder="Ouagadougou"></label>
<button class="full">Envoyer pour validation</button>

  <p class="mut">Pas d’annonce immobilière, de produit pour La Centrale ni de recherche d’emploi. Une fois validée, la publication reste visible 2 jours.</p></form>`;  
  document.getElementById('f').onsubmit=async e=>{e.preventDefault();  
    try{await q(sb.from(t.value==='offer'?'offers':'searches').insert({user_id:state.me.id,title:ti.value.trim(),description:d.value.trim(),category:c.value.trim()||null,city:v.value.trim()||null}));  
    toast('Publication envoyée : en attente de validation.');location.hash='#/'}catch(_){}};  
}
