const state={
  tab:'home',budget:60,cycle:true,query:'',
  profile:{
    goal:'Ausgewogen essen',diet:'Alles',proteinFocus:true,cookTime:'25 Min.',people:'1 Person',
    dislikes:['Pilze'],likes:['Pasta','Bowls','Beeren'],cravings:['Cremig','Herzhaft'],
    allergies:[],supermarket:'REWE',budget:60
  },
  meals:[
{id:1,type:'Frühstück',name:'Protein Porridge',kcal:390,protein:27,done:true,ingredients:'Haferflocken, Skyr, Beeren, Nüsse',tags:['Süß','Proteinreich']},
{id:2,type:'Mittagessen',name:'Chicken Caesar Wrap',kcal:520,protein:42,done:true,ingredients:'Hähnchen, Salat, Parmesan, Joghurtdressing',tags:['Herzhaft','Schnell']},
{id:3,type:'Abendessen',name:'Creamy Tomato Protein Pasta',kcal:610,protein:45,done:false,ingredients:'Vollkornnudeln, Hähnchen, Tomaten, Spinat',tags:['Cremig','Pasta','Proteinreich']},
{id:4,type:'Snack',name:'Skyr Bowl',kcal:180,protein:19,done:false,ingredients:'Skyr, Beeren, Honig, Mandeln',tags:['Süß','Beeren']}
  ],
  items:[['Hähnchenbrust','600 g',6.49],['Skyr','1 kg',2.78],['Wraps','1 Packung',1.99],['Vollkornnudeln','500 g',1.29],['Tomaten','500 g',2.49],['Blattspinat','300 g',1.79],['Beeren','400 g',3.99],['Haferflocken','500 g',0.99],['Parmesan','150 g',2.99],['Salat','1 Kopf',1.49],['Mandeln','200 g',2.49],['Joghurt','500 g',1.19]].map((x,i)=>({id:i+1,name:x[0],amount:x[1],price:x[2],checked:i<2}))
};

const options={
  goals:['Abnehmen','Gewicht halten','Muskelaufbau','Ausgewogen essen'],
  diets:['Alles','Vegetarisch','Vegan','Pescetarisch'],
  cravings:['Süß','Salzig','Cremig','Knusprig','Herzhaft','Frisch','Scharf','Comfort Food'],
  likes:['Pasta','Bowls','Wraps','Suppen','Salate','Reisgerichte','Kartoffeln','Beeren','Schokolade','Käse','Hähnchen','Fisch'],
  dislikes:['Pilze','Fisch','Tomaten','Zwiebeln','Paprika','Brokkoli','Avocado','Eier','Käse','Nüsse','Hülsenfrüchte','Scharfes Essen'],
  allergies:['Laktose','Gluten','Nüsse','Erdnüsse','Ei','Soja','Fisch','Krustentiere']
};

const app=document.getElementById('app');
const euro=n=>n.toFixed(2).replace('.',',')+' €';
const eaten=()=>state.meals.filter(m=>m.done).reduce((s,m)=>s+m.kcal,0);
const protein=()=>state.meals.filter(m=>m.done).reduce((s,m)=>s+m.protein,0);
const shopTotal=()=>state.items.reduce((s,i)=>s+i.price,0);
const emoji=t=>t==='Frühstück'?'🥣':t==='Mittagessen'?'🌯':t==='Abendessen'?'🍝':t==='Snack'?'🫐':'🍽️';

function personalizedHint(){
  const c=state.profile.cravings.length?state.profile.cravings.join(' & '):'offen';
  const avoid=state.profile.dislikes.length?state.profile.dislikes.slice(0,2).join(', '):'keine Abneigungen';
  return `Heute berücksichtigt NOURA: ${c} · ohne ${avoid}.`;
}

function mealCard(m){return `<div class="meal-card ${m.done?'done':''}"><div class="meal-emoji">${emoji(m.type)}</div><div class="meal-copy"><small>${m.type}</small><strong>${m.name}</strong><span>${m.ingredients}</span></div><div class="meal-meta"><b>${m.kcal} kcal</b><button class="check-btn ${m.done?'checked':''}" data-meal="${m.id}">${m.done?'✓':''}</button></div></div>`}
function stat(i,v,s,l){return `<div class="stat-card"><div class="icon-bubble">${i}</div><strong>${v}</strong><span>${s}</span><small>${l}</small></div>`}
function home(){return `<section class="screen"><div class="hero"><div><p class="eyebrow">DIENSTAG, 18. AUGUST</p><h2>Guten Morgen, Annabelle ☀️</h2><p>${personalizedHint()}</p></div><div class="avatar">A</div></div><div class="stats-grid">${stat('👣','3.842','/ 8.000','Schritte')}${stat('🔥',eaten(),'/ 1.750','kcal')}${stat('💪',protein(),'/ 105 g','Protein')}${stat('🌙','7 h 34','min','Schlaf')}</div>
${state.cycle?`<div class="cycle-card"><div class="cycle-icon">✿</div><div><strong>Zyklus • Tag 24</strong><span>Lutealphase</span><p>Heute: einfache, sättigende Mahlzeiten und ausreichend Flüssigkeit einplanen.</p></div><b>›</b></div>`:''}
<div class="taste-card"><div><span class="taste-icon">✨</span><div><strong>Dein aktueller Food-Mood</strong><p>${state.profile.cravings.length?state.profile.cravings.join(' · '):'Noch nichts ausgewählt'}</p></div></div><button data-go-profile="1">Anpassen</button></div>
<div class="section-title"><div><p class="eyebrow">HEUTE</p><h3>Dein Essensplan</h3></div><strong>${Math.max(0,1750-eaten())} kcal übrig</strong></div><div class="meal-list">${state.meals.map(mealCard).join('')}</div>
<div class="shop-banner"><span>🛒</span><div><small>Wocheneinkauf</small><strong>${state.profile.supermarket} · ${euro(shopTotal())}</strong><span>unter deinem ${state.budget}-€-Budget</span></div><b>›</b></div><div class="insight-card"><span>✨</span><div><strong>NOURA Insight</strong><p>Deine Auswahl wird jetzt nach Vorlieben, Abneigungen und Gelüsten personalisiert. Diese Demo zeigt die gespeicherten Präferenzen direkt im Tagesplan.</p></div></div></section>`}
function plan(){return `<section class="screen"><div class="page-head"><div><p class="eyebrow">WOCHENPLAN</p><h2>Dein Plan</h2></div><b>▣</b></div><div class="week-row">${['Mo','Di','Mi','Do','Fr','Sa','So'].map((d,i)=>`<div class="day-pill ${i===1?'active':''}"><span>${d}</span><b>${17+i}</b></div>`).join('')}</div><div class="summary-card"><div><small>Tagesziel</small><strong>1.750 kcal</strong></div><div><small>Protein</small><strong>105 g</strong></div><div><small>Food-Mood</small><strong>${state.profile.cravings[0]||'Offen'}</strong></div></div><div class="preference-strip"><span>Mag ich:</span>${state.profile.likes.slice(0,3).map(x=>`<b>${x}</b>`).join('')}<span>Meiden:</span>${state.profile.dislikes.slice(0,2).map(x=>`<b class="avoid">${x}</b>`).join('')}</div><div class="meal-list">${state.meals.map(mealCard).join('')}</div><button class="primary-btn">✨ Plan nach Vorlieben optimieren</button></section>`}
function track(){return `<section class="screen"><div class="page-head"><div><p class="eyebrow">TRACKING</p><h2>Essen eintragen</h2></div><b>＋</b></div><div class="track-card"><label>Lebensmittel / Gericht<input id="foodName" placeholder="z. B. Banane"></label><div class="field-grid"><label>Kalorien<input id="foodKcal" type="number" placeholder="120"></label><label>Protein (g)<input id="foodProtein" type="number" placeholder="2"></label></div><button id="addFood" class="primary-btn">＋ Hinzufügen</button></div><div class="ai-card"><span>✨</span><div><strong>Was passt jetzt zu dir?</strong><p>Aktuelle Gelüste: ${state.profile.cravings.join(', ')||'keine'} · Nicht mögen: ${state.profile.dislikes.join(', ')||'keine'}.</p></div></div><div class="meal-list">${state.meals.filter(m=>m.type==='Zusätzlich').map(m=>mealCard(m)).join('')}</div></section>`}
function shop(){let diff=state.budget-shopTotal();let filtered=state.items.filter(i=>i.name.toLowerCase().includes(state.query.toLowerCase()));return `<section class="screen"><div class="page-head"><div><p class="eyebrow">SUPERMARKT</p><h2>Dein ${state.profile.supermarket}-Einkauf</h2></div><b>🛒</b></div><div class="budget-card"><div><span>💳</span><div><small>Wochenbudget</small><strong>${state.budget} €</strong></div></div><input id="budget" type="range" min="30" max="120" value="${state.budget}"><p class="${diff>=0?'good':'bad'}">${diff>=0?euro(diff)+' übrig':euro(Math.abs(diff))+' über Budget'}</p></div><div class="search"><span>⌕</span><input id="search" value="${state.query}" placeholder="Einkauf durchsuchen"></div><div class="shop-list">${filtered.map(i=>`<button class="shop-item ${i.checked?'checked':''}" data-item="${i.id}"><span class="shop-check">${i.checked?'✓':''}</span><div><strong>${i.name}</strong><small>${i.amount}</small></div><b>${euro(i.price)}</b></button>`).join('')}</div><div class="shop-total"><span>Geschätzter Gesamtpreis</span><strong>${euro(shopTotal())}</strong></div><div class="saving-card"><span>🌿</span><div><strong>9,46 € potenzielle Ersparnis</strong><p>Mock-Daten für Angebote. Echte Filialpreise benötigen später eine Datenquelle oder Partner-API.</p></div></div></section>`}

function chips(name,values,selected,multi=true){return `<div class="chips" data-chip-group="${name}" data-multi="${multi}">${values.map(v=>`<button class="chip ${selected.includes(v)?'active':''}" data-value="${v}">${v}</button>`).join('')}</div>`}
function profile(){return `<section class="screen"><div class="page-head"><div><p class="eyebrow">PROFIL & VORLIEBEN</p><h2>NOURA lernt dich kennen</h2></div><b>⚙️</b></div><div class="profile-card"><div class="big-avatar">A</div><div><strong>${state.profile.goal}</strong><span>1.750 kcal · 105 g Protein</span><small>${state.profile.supermarket} · ${state.budget} € Wochenbudget</small></div></div>
<div class="pref-section"><p class="eyebrow">DEIN ZIEL</p><h3>Was möchtest du erreichen?</h3>${chips('goal',options.goals,[state.profile.goal],false)}</div>
<div class="pref-section"><p class="eyebrow">ERNÄHRUNG</p><h3>Wie möchtest du essen?</h3>${chips('diet',options.diets,[state.profile.diet],false)}</div>
<div class="pref-section"><p class="eyebrow">GELÜSTE</p><h3>Worauf hast du häufig Lust?</h3><p class="helper">Mehrfachauswahl möglich. Das beeinflusst spätere Rezeptvorschläge.</p>${chips('cravings',options.cravings,state.profile.cravings,true)}</div>
<div class="pref-section"><p class="eyebrow">MAG ICH</p><h3>Was isst du besonders gerne?</h3>${chips('likes',options.likes,state.profile.likes,true)}</div>
<div class="pref-section"><p class="eyebrow">MAG ICH NICHT</p><h3>Was soll NOURA möglichst vermeiden?</h3>${chips('dislikes',options.dislikes,state.profile.dislikes,true)}</div>
<div class="pref-section"><p class="eyebrow">ALLERGIEN & UNVERTRÄGLICHKEITEN</p><h3>Was muss berücksichtigt werden?</h3>${chips('allergies',options.allergies,state.profile.allergies,true)}</div>
<div class="pref-section"><p class="eyebrow">ALLTAG</p><h3>Wie soll dein Plan aussehen?</h3><div class="field-grid"><label>Kochzeit<select id="cookTime"><option>15 Min.</option><option ${state.profile.cookTime==='25 Min.'?'selected':''}>25 Min.</option><option>40 Min.</option><option>egal</option></select></label><label>Personen<select id="people"><option>1 Person</option><option>2 Personen</option><option>3 Personen</option><option>4+ Personen</option></select></label></div></div>
<div class="settings-list"><button id="cycleToggle" class="setting-row"><div class="setting-icon">♡</div><div><strong>Zyklus berücksichtigen</strong><span>Optionale Personalisierung</span></div><span class="switch ${state.cycle?'on':''}"><i></i></span></button>${setting('🌙','Schlaf','Apple Health Verbindung geplant')}${setting('👣','Aktivität','8.000 Schritte pro Tag')}</div>
<div class="privacy-card"><strong>So nutzt NOURA deine Auswahl</strong><p>In dieser Version werden die Angaben nur lokal im Browserzustand genutzt. In einer echten App würden Allergien und Gesundheitsdaten besonders geschützt und nur mit ausdrücklicher Einwilligung verarbeitet.</p></div></section>`}
function setting(i,t,x){return `<div class="setting-row"><div class="setting-icon">${i}</div><div><strong>${t}</strong><span>${x}</span></div><b>›</b></div>`}
function render(){app.innerHTML=({home,plan,track,shop,profile}[state.tab])();document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===state.tab));bind()}
function toggleArray(key,val){const arr=state.profile[key];const i=arr.indexOf(val);i>=0?arr.splice(i,1):arr.push(val)}
function bind(){
  document.querySelectorAll('[data-meal]').forEach(b=>b.onclick=()=>{let m=state.meals.find(x=>x.id==b.dataset.meal);m.done=!m.done;render()});
  document.querySelectorAll('[data-item]').forEach(b=>b.onclick=()=>{let i=state.items.find(x=>x.id==b.dataset.item);i.checked=!i.checked;render()});
  document.querySelectorAll('[data-go-profile]').forEach(b=>b.onclick=()=>{state.tab='profile';render()});
  document.querySelectorAll('[data-chip-group] .chip').forEach(b=>b.onclick=()=>{const g=b.parentElement.dataset.chipGroup;const multi=b.parentElement.dataset.multi==='true';const val=b.dataset.value;if(multi)toggleArray(g,val);else state.profile[g]=val;render()});
  let a=document.getElementById('addFood');if(a)a.onclick=()=>{let n=document.getElementById('foodName').value.trim(),k=+document.getElementById('foodKcal').value,p=+document.getElementById('foodProtein').value;if(!n||!k)return;state.meals.push({id:Date.now(),type:'Zusätzlich',name:n,kcal:k,protein:p||0,done:true,ingredients:'Manuell eingetragen'});render()};
  let s=document.getElementById('search');if(s)s.oninput=e=>{state.query=e.target.value;app.innerHTML=shop();bind()};
  let bd=document.getElementById('budget');if(bd)bd.oninput=e=>{state.budget=+e.target.value;state.profile.budget=state.budget;app.innerHTML=shop();bind()};
  let c=document.getElementById('cycleToggle');if(c)c.onclick=()=>{state.cycle=!state.cycle;render()};
  let ct=document.getElementById('cookTime');if(ct)ct.onchange=e=>{state.profile.cookTime=e.target.value};
  let pp=document.getElementById('people');if(pp)pp.onchange=e=>{state.profile.people=e.target.value};
}
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;render()});render();
