import {sb,q} from '../services/supabase.js';
import {esc,fcfa,dt,norm,mail} from '../utils/format.js';
import {app,nav,toast} from '../components/ui.js';
import {state} from '../contexts/state.js';

export async function contacts(){
  const cs=await q(sb.from('contacts').select('*').order('created_at',{ascending:false}));
  const rows=await Promise.all(cs.map(async c=>{const o=c.user_a===state.me.id?c.user_b:c.user_a;
    const {data}=await sb.rpc('get_contact_details',{p_user_id:o});return data?.[0]}));
  app.innerHTML=`<h1>Contacts</h1>`+(rows.filter(Boolean).map(r=>`<div class="card"><b>${esc(r.full_name)}</b> <span class="mut">${esc(r.professional_title||'')} ${esc(r.city||'')}</span><br>
   <a class="btn" href="tel:${esc(r.phone)}">Appeler</a><a class="btn alt" style="background:#fff;color:var(--g);border:1px solid var(--g)" href="https://wa.me/${esc(String(r.phone).replace(/\D/g,''))}">WhatsApp</a></div>`).join('')||'<p class="card mut">Vos mises en relation validées apparaîtront ici avec les coordonnées.</p>');
}
