import {sb,q} from '../services/supabase.js';
import {esc,fcfa,dt,norm,mail} from '../utils/format.js';
import {app,nav,toast} from '../components/ui.js';
import {state} from '../contexts/state.js';

export function soon(id) {
const m = MODULES.find(x => x.id === id);
app.innerHTML = m ? `<a href="#/">← Retour</a><h1>${esc(m.name)}</h1><div class="card"><span class="tag s">En préparation</span>

  <p>${esc(m.desc)}.</p><p class="mut">Ce module ouvrira quand ses tables, règles et permissions serveur seront prêtes. Rien n’est simulé.</p></div>`  
    : '<p class="card">Module introuvable.</p>';  
}
