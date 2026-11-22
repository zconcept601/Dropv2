# DropAffy V2 — interface

Interface web (HTML + modules JavaScript, sans étape de compilation) connectée à la base Supabase `dropaffy-v2`.

## Mise en ligne (GitHub Pages)
1. Placez le contenu de ce dossier à la **racine** du dépôt (`index.html` doit être à la racine).
2. Settings → Pages → Branch `main`, dossier `/ (root)`.
3. Supabase → Authentication → URL Configuration : ajoutez l'adresse GitHub Pages en *Site URL*.
4. Supabase → Authentication → Providers → Email : désactivez « Confirm email » (l'inscription par téléphone utilise un e-mail interne).

## Premier administrateur
Après votre inscription, dans l'éditeur SQL Supabase :
`insert into public.user_roles (user_id, role) values ('VOTRE-UUID', 'admin');`

## Structure
- `src/pages/` un fichier par écran · `src/services/` accès Supabase et session · `src/components/` interface commune
- `src/contexts/` état partagé · `src/utils/` formats · `src/constants.js` modules et statuts · `src/config.js` URL et clé publique

## Règles
- Clé publique uniquement. Aucune clé `service_role`.
- Quotas, soldes, rôles et validations sont contrôlés par le serveur (RLS, triggers, fonctions). L'interface ne fait qu'afficher et appeler.
- Un module sans backend est affiché « En préparation » (`src/constants.js`), jamais simulé. Watchers est exclu.

## État
Lots 1 à 3 et administration de base : socle, tableau de bord, Communauté, contacts, notifications, activité, portefeuille, quota.
Lots 4 à 7 (La Centrale, Immobilier, Transport, DropAds, DropAlgo) : à construire après création de leurs tables et règles dans Supabase.
