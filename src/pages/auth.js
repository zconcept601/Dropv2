import {sb,q} from '../services/supabase.js';
import {esc,fcfa,dt,norm,mail} from '../utils/format.js';
import {app,nav,toast} from '../components/ui.js';
import {state} from '../contexts/state.js';

export function authView(onDone,mode='login'){
nav.hidden=true;const reg=mode==='register';
app.innerHTML=`<h1>DropAffy</h1><p class="mut">Besoin, réseau, opportunité.</p>

  <form id="f" class="card">${reg?'<label>Nom complet<input id="n" required autocomplete="name"></label>':''}  
  <label>Numéro de téléphone<input id="p" type="tel" required autocomplete="tel" placeholder="70 12 34 56"></label>  
  <label>Mot de passe<input id="w" type="password" required minlength="8" autocomplete="${reg?'new-password':'current-password'}"></label>  
  <button class="full">${reg?'Créer mon compte':'Se connecter'}</button></form>  
  <button class="alt full" id="sw">${reg?'J’ai déjà un compte':'Créer un compte'}</button>`;  
  document.getElementById('sw').onclick=()=>authView(onDone,reg?'login':'register');  
  document.getElementById('f').onsubmit=async e=>{e.preventDefault();  
    const d=norm(p.value),email=mail(d);  
    try{  
      if(reg){await q(sb.auth.signUp({email,password:w.value,options:{data:{full_name:n.value.trim(),phone:'+'+d}}}))}  
      else await q(sb.auth.signInWithPassword({email,password:w.value}));  
      onDone();  
    }catch(_){}};  
}
