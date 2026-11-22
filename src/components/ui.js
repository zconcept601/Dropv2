
export const app = document.getElementById('app');
export const nav = document.getElementById('nav');
export function toast(m) {
  const t = document.getElementById('toast'); t.textContent = m; t.style.display = 'block';
  clearTimeout(t._h); t._h = setTimeout(() => t.style.display = 'none', 4500);
}
export const loading = () => { app.innerHTML = '<p class="card mut" aria-busy="true">Chargement…</p>'; };
const TABS = [['#/','Accueil'],['#/community','Communauté'],['#/contacts','Contacts'],['#/activity','Activité'],['#/profile','Profil']];
const active = (u, h) => u === '#/' ? (h === '#/' || h.startsWith('#/m/'))
  : h === u || (u === '#/community' && (h.startsWith('#/p/') || h === '#/publish'))
  || (u === '#/activity' && h === '#/wallet') || (u === '#/profile' && h === '#/admin');
export function setNav() {
  const h = location.hash || '#/'; nav.hidden = false;
  nav.innerHTML = TABS.map(([u, l]) => `<a href="${u}" class="${active(u, h) ? 'on' : ''}" ${active(u, h) ? 'aria-current="page"' : ''}>${l}</a>`).join('');
}
// Anti double-soumission : un bouton cliqué est désactivé brièvement (paiement, demande, publication).
document.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  setTimeout(() => { b.disabled = true; }, 0); setTimeout(() => { b.disabled = false; }, 1500);
});
