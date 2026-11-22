import {sb} from './supabase.js';
// L'état admin vient du serveur (is_admin), pas du navigateur.
export async function loadSession() {
  const {data} = await sb.auth.getSession(); const user = data.session?.user || null; let admin = false;
  if (user) { const r = await sb.rpc('is_admin'); admin = r.data === true; }
  return {user, admin};
}
