export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const fcfa = n => new Intl.NumberFormat('fr-FR').format(n || 0) + ' FCFA';
export const dt = d => new Date(d).toLocaleString('fr-FR', {dateStyle:'short', timeStyle:'short'});
export const norm = p => { let d = String(p).replace(/\D/g, ''); if (d.length === 8) d = '226' + d; return d; };
export const mail = d => `p${d}@users.dropaffy.app`;
