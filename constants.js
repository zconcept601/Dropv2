// Modules : seul le statut 'ready' ouvre un écran réel. Rien n'est simulé.
export const MODULES = [
  {id:'centrale', name:'La Centrale', desc:'Catalogue, affiliation et commissions', status:'soon'},
  {id:'immobilier', name:'Immobilier', desc:'Terrains, parcelles et logements à vendre ou à louer', status:'soon'},
  {id:'transport', name:'Transport', desc:'Transport, livraison et déménagement', status:'soon'},
  {id:'dropads', name:'DropAds', desc:'Campagnes publicitaires et diffuseurs', status:'soon'},
  {id:'dropalgo', name:'DropAlgo', desc:'Aide au rapprochement des besoins et offres', status:'soon'},
];
export const STATUS = {pending:'En attente', approved:'Publiée', rejected:'Refusée', expired:'Expirée', fulfilled:'Satisfaite'};
