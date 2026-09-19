/* ============================================================
   DESIGN STUDIO — Prototype Harness only (never product UI).
   Family -> Screen -> (State / configuration) -> Device.
   Data-driven: DESIGN_FAMILIES lists which screens belong to which family and how to open each
   one in a valid, deterministic state. Every "open" reuses the existing product setup functions
   (go, openLegal, selectCategory, openMathOperation, openMissingOperation, openGameTypeIntro,
   openHistoryDetail, prOpen) — no product logic is duplicated here.
   Player keeps its existing structured review picker (#subNav, prRender/prOpen).
   Depends on globals defined by the main script in index.html (loaded before this file).
   ============================================================ */

const DESIGN_FAMILIES = [
  { id:'public', label:'Public', screens:[
    { key:'landing', label:'Landing', open:()=>go('landing') },
    { key:'about', label:'About', open:()=>go('about') },
    { key:'contact', label:'Contact', open:()=>go('contact') },
    { key:'report', label:'Report', open:()=>go('report') },
  ]},
  { id:'auth', label:'Auth', screens:[
    { key:'login', label:'Login', open:()=>go('login') },
    { key:'register', label:'Register', open:()=>go('register') },
    { key:'forgot-password', label:'Forgot Password', open:()=>go('forgot-password') },
    { key:'claim-success', label:'Claim Success', open:()=>go('claim-success') },
  ]},
  { id:'discovery', label:'Discovery', screens:[
    { key:'games', label:'Games', open:()=>go('games') },
    { key:'category-select', label:'Category Select', open:()=>go('category-select') },
    { key:'gametype-select', label:'Game Type Select', open:()=>selectCategory('quiz') },
    { key:'math-difficulty', label:'Math Difficulty', open:()=>{ selectCategory('math'); openMathOperation(0); } },
    { key:'missing-difficulty', label:'Missing Number Difficulty', open:()=>{ selectCategory('math'); openMissingOperation('add'); addrBar.textContent = 'ducalgame.com/new/math/missing/add'; } }, // address string matches the Addition config shown
    { key:'gametype-intro', label:'Game Type Intro', open:()=>{ selectCategory('quiz'); openGameTypeIntro('quiz', 0); } },
    { key:'creator-name', label:'Creator Name', open:()=>go('creator-name') },
  ]},
  { id:'creator', label:'Creator', screens:[
    { key:'dashboard', label:'Dashboard', open:()=>go('dashboard') },
    { key:'library', label:'My Games / Library', open:()=>go('library') },
    { key:'analytics', label:'Analytics', open:()=>go('analytics') },
    { key:'detail', label:'Game Detail', open:()=>go('detail') },
  ]},
  { id:'account', label:'Account', screens:[
    { key:'profile', label:'Profile', open:()=>go('profile') },
    { key:'play-history', label:'Play History', open:()=>go('play-history') },
    { key:'history-detail', label:'History Detail', open:()=>openHistoryDetail(0) },
    { key:'notifications', label:'Notifications', open:()=>go('notifications') },
    { key:'settings', label:'Settings', open:()=>go('settings') },
  ]},
  { id:'editor', label:'Editor', screens:[
    { key:'workbench', label:'Workbench', open:()=>{ wbGameHasPlays = false; go('workbench'); dsRestoreAddr('workbench'); } },
    { key:'workbench-locked', label:'Workbench Locked', open:()=>{ wbGameHasPlays = true; go('workbench'); dsRestoreAddr('workbench-locked'); } },
    { key:'challenge', label:'Challenge', open:()=>go('challenge') },
    { key:'challenge-preview-all', label:'Challenge Preview', open:()=>go('challenge-preview-all') },
    { key:'challenge-share', label:'Challenge Share', open:()=>go('challenge-share') },
  ]},
  // Player has no screen row: its structured review picker (#subNav: Series -> Operation ->
  // Difficulty -> State) is the existing navigation and is preserved as-is.
  { id:'player', label:'Player', screens:[], player:true },
  { id:'legal-system', label:'Legal / System', groups:[
    { label:'Legal', screens:[
      { key:'legal-privacy', label:'Privacy Policy', open:()=>openLegal('privacy') },
      { key:'legal-terms', label:'Terms of Service', open:()=>openLegal('terms') },
      { key:'legal-cookies', label:'Cookie Policy', open:()=>openLegal('cookies') },
      { key:'legal-community-guidelines', label:'Community Guidelines', open:()=>openLegal('community-guidelines') },
      { key:'legal-copyright', label:'Copyright', open:()=>openLegal('copyright') },
    ]},
    { label:'System', screens:[
      { key:'link-expired', label:'Link Expired', open:()=>go('link-expired') },
      { key:'game-offline', label:'Game Offline', open:()=>go('game-offline') },
      { key:'not-found', label:'404 / Not Found', open:()=>go('not-found') },
    ]},
  ]},
];

// flatten helpers: family -> its screens (groups flattened), and key -> family lookup
function dsFamilyScreens(fam){
  return fam.groups ? fam.groups.reduce((a, g) => a.concat(g.screens), []) : fam.screens;
}
const DS_KEY_TO_FAMILY = {};
DESIGN_FAMILIES.forEach(f => dsFamilyScreens(f).forEach(sc => { DS_KEY_TO_FAMILY[sc.key] = f; }));

// the Workbench entries share one underlying screen id, so restore the address string go() set
// from the per-entry metadata (same override the previous flat buttons applied)
function dsRestoreAddr(metaId){
  const meta = screens.find(x => x.id === metaId);
  if (meta) addrBar.textContent = meta.addr;
}

/* ---- device (preview frame width only; the Design Studio header is never resized) ---- */
const DS_DEVICES = {
  full: { label:'Desktop', w:1280, slug:'desktop' },
  '834': { label:'Tablet', w:834, slug:'tablet' },
  '390': { label:'Mobile', w:390, slug:'mobile' },
};
let dsDeviceKey = 'full';

const browserFrame = document.getElementById('browserFrame');
function dsSetDevice(key){
  if (!DS_DEVICES[key]) key = 'full';
  dsDeviceKey = key;
  document.querySelectorAll('#deviceToggle button').forEach(x => x.classList.toggle('on', x.dataset.w === key));
  browserFrame.style.width = (key === 'full') ? '' : key + 'px';
  browserFrame.style.maxWidth = '100%';
}
document.querySelectorAll('#deviceToggle button').forEach(b=>{
  b.onclick = ()=>{ dsSetDevice(b.dataset.w); dsSync(); };
});

/* ---- Design Studio rendering ---- */
const dsFamiliesEl = document.getElementById('dsFamilies');
const dsScreensEl = document.getElementById('dsScreens');
const dsContextEl = document.getElementById('designContext');
let dsRenderedFamilyId = null;

function dsBuildFamilyRow(){
  dsFamiliesEl.innerHTML = '';
  DESIGN_FAMILIES.forEach(f => {
    const b = document.createElement('button');
    b.textContent = f.label;
    b.dataset.family = f.id;
    b.onclick = () => dsSelectFamily(f);
    dsFamiliesEl.appendChild(b);
  });
}

function dsSelectFamily(fam){
  if (fam.player) { prOpen(); return; } // existing Player review picker opens the current series/state
  dsFamilyScreens(fam)[0].open();       // deterministic first screen of the family
}

function dsBuildScreenRow(fam){
  const grp = document.getElementById('navGroup');
  grp.innerHTML = '';
  if (fam.player) return; // Player uses #subNav instead
  const groups = fam.groups || [{ label:null, screens:fam.screens }];
  groups.forEach(g => {
    if (g.label) {
      const l = document.createElement('span');
      l.className = 'ds-group-label';
      l.textContent = g.label;
      grp.appendChild(l);
    }
    g.screens.forEach(sc => {
      const b = document.createElement('button');
      b.textContent = sc.label;
      b.dataset.target = sc.key;
      b.onclick = () => sc.open();
      grp.appendChild(b);
    });
  });
}

// what is currently showing, derived from the real product state (so in-product navigation stays in sync)
function dsCurrent(){
  const id = currentScreenId;
  if (id === 'player') return { family: DESIGN_FAMILIES.find(f => f.player), key:'player' };
  let key = id;
  if (id === 'workbench') key = wbGameHasPlays ? 'workbench-locked' : 'workbench';
  if (id === 'legal') key = 'legal-' + addrBar.textContent.split('/').pop();
  return { family: DS_KEY_TO_FAMILY[key] || null, key };
}

function dsScreenLabel(key){
  const fam = DS_KEY_TO_FAMILY[key];
  const sc = fam && dsFamilyScreens(fam).find(x => x.key === key);
  return sc ? sc.label : key;
}

// Player: derive series/state from the visible card so the picker and context agree even after in-product navigation
function dsPlayerState(){
  const card = [...document.querySelectorAll('.player-card')].find(el => el.style.display === 'block');
  const stateId = card ? card.dataset.p : 'landing';
  let series = null;
  for (const s of PLAYER_REVIEW_SERIES) {
    if (PLAYER_REVIEW_STATES[s.id].some(st => st.id === stateId)) { series = s.id; break; }
  }
  return { stateId, series: series || prSeries };
}

function dsSyncPlayerPicker(ps){
  if (dsBusy) return;
  let op = prOpId, diff = prDiffId;
  if (ps.series === 'math') { op = currentMathOpId; diff = currentMathDiffId; }
  if (ps.series === 'missing') { op = currentMissingOpId; diff = currentMissingDiffId; }
  const idx = PLAYER_REVIEW_STATES[ps.series].findIndex(st => st.id === ps.stateId);
  if (ps.series !== prSeries || op !== prOpId || diff !== prDiffId || idx !== prStateIdx) {
    prSeries = ps.series; prOpId = op; prDiffId = diff; prStateIdx = idx < 0 ? 0 : idx;
    prRender();
  }
}

// pgo() re-toggles every #subNav button against the state id, which clears the Series/Operation/Difficulty
// highlight; re-mark each level of the picker from the review state so the whole selection stays visible
function dsMarkPlayerPicker(){
  const rows = subNav.querySelectorAll('.pr-row');
  const isMath = prSeries === 'math' || prSeries === 'missing';
  const selected = [prSeries];
  if (isMath) selected.push(prOpId, prDiffId);
  selected.push(PLAYER_REVIEW_STATES[prSeries][prStateIdx].id);
  rows.forEach((row, i) => {
    row.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.pr === selected[i]));
  });
}

function dsContextItems(cur){
  const dev = DS_DEVICES[dsDeviceKey];
  const items = [['Family', cur.family ? cur.family.label : '—']];
  if (cur.key === 'player') {
    const ps = dsPlayerState();
    const seriesLabel = PLAYER_REVIEW_SERIES.find(s => s.id === ps.series).label;
    const stateLabel = (PLAYER_REVIEW_STATES[ps.series].find(st => st.id === ps.stateId) || {}).label || ps.stateId;
    items.push(['Series', seriesLabel]);
    if (ps.series === 'math') {
      items.push(['Mode', PLAYER_REVIEW_OP_LABELS[currentMathOpId]], ['Difficulty', PLAYER_REVIEW_MATH_DIFF_LABELS[currentMathDiffId]]);
    } else if (ps.series === 'missing') {
      items.push(['Mode', PLAYER_REVIEW_OP_LABELS[currentMissingOpId]], ['Difficulty', PLAYER_REVIEW_MISSING_DIFF_LABELS[currentMissingDiffId]]);
    }
    items.push(['State', stateLabel]);
    if (ps.series === 'math') items.push(['Game ID', currentMathGameId]);
    if (ps.series === 'missing') items.push(['Game ID', currentMissingGameId]);
  } else {
    items.push(['Screen', dsScreenLabel(cur.key)]);
    // relevant selected configuration only, for the stateful Discovery screens
    if (cur.key === 'gametype-select') items.push(['Category', document.getElementById('gtsCatTitle').textContent]);
    if (cur.key === 'math-difficulty') items.push(['Series', 'Basic Arithmetic'], ['Mode', PLAYER_REVIEW_OP_LABELS[currentMathOpId]]);
    if (cur.key === 'missing-difficulty') items.push(['Series', 'Missing Number'], ['Mode', PLAYER_REVIEW_OP_LABELS[currentMissingOpId]]);
    if (cur.key === 'gametype-intro') items.push(['Game Type', document.getElementById('gtiTitle').textContent]);
  }
  items.push(['Device', dev.label + ' ' + dev.w]);
  return items;
}

function dsSync(){
  if (typeof currentScreenId === 'undefined' || !dsFamiliesEl.children.length) return;
  const cur = dsCurrent();
  if (cur.key === 'player') { dsSyncPlayerPicker(dsPlayerState()); dsMarkPlayerPicker(); }

  // family row + screen row
  dsFamiliesEl.querySelectorAll('button').forEach(b => b.classList.toggle('active', !!cur.family && b.dataset.family === cur.family.id));
  if (cur.family && cur.family.id !== dsRenderedFamilyId) {
    dsBuildScreenRow(cur.family);
    dsRenderedFamilyId = cur.family.id;
  }
  dsScreensEl.style.display = (cur.family && cur.family.player) ? 'none' : '';
  document.querySelectorAll('#navGroup button').forEach(b => b.classList.toggle('active', b.dataset.target === cur.key));

  // compact design context (harness-only, outside the browser frame)
  dsContextEl.innerHTML = '';
  dsContextItems(cur).forEach(([k, v]) => {
    const item = document.createElement('span');
    item.className = 'ds-ctx-item';
    const kk = document.createElement('span'); kk.className = 'k'; kk.textContent = k;
    const vv = document.createElement('span'); vv.className = 'v'; vv.textContent = v;
    item.appendChild(kk); item.appendChild(vv);
    dsContextEl.appendChild(item);
  });

  if (!dsRestoring) dsPersist(cur);
}

/* ============================================================
   URL + localStorage design state (Prototype Harness only — NOT Ducal Game production routes).
   ?family=account&screen=settings&device=mobile
   ?family=player&series=missing-number&mode=mixed&difficulty=4-digit&state=result&device=tablet
   Startup priority: valid URL state -> valid saved state (localStorage) -> default.
   ============================================================ */
const DS_STORAGE_KEY = 'ducalDesignStudioState';
const DS_DEFAULT_STATE = { family:'public', screen:'landing', device:'desktop' };
const DS_SERIES_SLUG = { quiz:'quiz', iq:'iq', connection:'connection', math:'basic-math', missing:'missing-number' };
const DS_OP_SLUG = { add:'addition', sub:'subtraction', mul:'multiplication', div:'division', mixed:'mixed' };
let dsRestoring = false;

function dsSlug(label){ return String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function dsInvert(map){ const o = {}; Object.keys(map).forEach(k => { o[map[k]] = k; }); return o; }

const DS_KEY_TO_ENTRY = {};
DESIGN_FAMILIES.forEach(f => dsFamilyScreens(f).forEach(sc => { DS_KEY_TO_ENTRY[sc.key] = sc; }));

// current review state -> flat params (only the levels relevant to what is showing)
function dsParamsFor(cur){
  if (!cur.family) return null;
  const p = { family: cur.family.id };
  if (cur.key === 'player') {
    const ps = dsPlayerState();
    p.series = DS_SERIES_SLUG[ps.series];
    if (ps.series === 'math') {
      p.mode = DS_OP_SLUG[currentMathOpId];
      p.difficulty = dsSlug(PLAYER_REVIEW_MATH_DIFF_LABELS[currentMathDiffId]);
    } else if (ps.series === 'missing') {
      p.mode = DS_OP_SLUG[currentMissingOpId];
      p.difficulty = dsSlug(PLAYER_REVIEW_MISSING_DIFF_LABELS[currentMissingDiffId]);
    }
    const st = PLAYER_REVIEW_STATES[ps.series].find(x => x.id === ps.stateId);
    p.state = dsSlug(st ? st.label : ps.stateId);
  } else {
    p.screen = cur.key;
  }
  p.device = DS_DEVICES[dsDeviceKey].slug;
  return p;
}

// params (URL or saved) -> a valid review target, or null if nothing usable. Invalid pieces fall back safely.
function dsResolve(q){
  if (!q) return null;
  const device = dsInvert(Object.keys(DS_DEVICES).reduce((o, k) => { o[k] = DS_DEVICES[k].slug; return o; }, {}))[q.device] || 'full';
  const playerFam = DESIGN_FAMILIES.find(f => f.player);
  const wantsPlayer = q.family === 'player' || (!q.family && !q.screen && q.series);
  if (wantsPlayer) {
    const series = dsInvert(DS_SERIES_SLUG)[q.series] || 'quiz';
    const r = { family: playerFam, player: true, device, series, op: 'add', diff: null, stateIdx: 0 };
    if (series === 'math' || series === 'missing') {
      const ops = dsInvert(DS_OP_SLUG);
      r.op = ops[q.mode] || 'add';
      const diffs = series === 'math' ? MATH_DIFFICULTIES : MISSING_DIFFICULTIES;
      const labels = series === 'math' ? PLAYER_REVIEW_MATH_DIFF_LABELS : PLAYER_REVIEW_MISSING_DIFF_LABELS;
      r.diff = (diffs.find(d => dsSlug(labels[d.id]) === q.difficulty) || diffs[0]).id;
    }
    const idx = PLAYER_REVIEW_STATES[series].findIndex(st => dsSlug(st.label) === q.state);
    r.stateIdx = idx < 0 ? 0 : idx;
    return r;
  }
  const entry = q.screen && DS_KEY_TO_ENTRY[q.screen];
  if (entry) return { family: DS_KEY_TO_FAMILY[q.screen], screen: entry, device }; // a valid screen decides its own family
  const fam = DESIGN_FAMILIES.find(f => f.id === q.family);
  if (fam) return { family: fam, screen: dsFamilyScreens(fam)[0], device };
  return null;
}

function dsApply(r){
  dsRestoring = true;
  try {
    dsSetDevice(r.device);
    if (r.player) {
      prSeries = r.series; prOpId = r.op; prDiffId = r.diff; prStateIdx = r.stateIdx;
      prRender();
      prOpen();
    } else {
      r.screen.open();
    }
  } finally {
    dsRestoring = false;
  }
  dsSync(); // also writes URL + saved state for the restored view
}

function dsPersist(cur){
  const p = dsParamsFor(cur || dsCurrent());
  if (!p) return;
  try {
    const qs = '?' + new URLSearchParams(p).toString();
    history.replaceState(null, '', location.pathname + qs + location.hash);
  } catch (e) { /* URL update unavailable (e.g. sandboxed) — harmless */ }
  try { localStorage.setItem(DS_STORAGE_KEY, JSON.stringify(p)); } catch (e) { /* storage unavailable — harmless */ }
}

function dsReadUrlState(){
  try {
    const sp = new URLSearchParams(location.search), q = {};
    ['family','screen','series','mode','difficulty','state','device'].forEach(k => { if (sp.has(k)) q[k] = sp.get(k); });
    return Object.keys(q).length ? q : null;
  } catch (e) { return null; }
}
function dsReadSavedState(){
  try { const raw = localStorage.getItem(DS_STORAGE_KEY); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
}

/* ---- Copy Review Link (harness-only control, outside the product preview) ---- */
function dsBuildToolsBar(){
  const bar = document.createElement('div');
  bar.className = 'ds-bar';
  dsContextEl.parentNode.insertBefore(bar, dsContextEl);
  bar.appendChild(dsContextEl);
  const btn = document.createElement('button');
  btn.className = 'ds-copy';
  btn.type = 'button';
  btn.textContent = 'Copy Review Link';
  let timer = null;
  const flash = msg => {
    btn.textContent = msg;
    clearTimeout(timer);
    timer = setTimeout(() => { btn.textContent = 'Copy Review Link'; }, 1500);
  };
  btn.onclick = () => {
    dsPersist(); // make sure the address bar reflects exactly what is on screen
    const url = location.href;
    const fallback = () => {
      try {
        const ta = document.createElement('textarea');
        ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        flash(ok ? 'Copied' : 'Copy unavailable');
      } catch (e) { flash('Copy unavailable'); }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => flash('Copied'), fallback);
    } else {
      fallback();
    }
  };
  bar.appendChild(btn);
}

/* ---- startup ---- */
function dsInit(){
  dsBuildFamilyRow();
  dsBuildToolsBar();
  dsApply(dsResolve(dsReadUrlState()) || dsResolve(dsReadSavedState()) || dsResolve(DS_DEFAULT_STATE));
}
dsInit();
