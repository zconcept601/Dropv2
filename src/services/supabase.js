import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm';
import {SUPABASE_URL, SUPABASE_KEY} from '../config.js';
import {toast} from '../components/ui.js';
export const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
// Résout une requête Supabase ; affiche l'erreur serveur (déjà en français pour les règles métier) et la relance.
export async function q(p) {
  let r; try { r = await p; } catch (e) { toast('Connexion instable. Réessayez.'); throw e; }
  if (r.error) {
    const e = r.error;
    if (e.code === 'PGRST301' || /jwt/i.test(e.message)) { toast('Session expirée : reconnectez-vous.'); await sb.auth.signOut(); }
    else toast(e.message);
    throw e;
  }
  return r.data;
}
