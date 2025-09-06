import { toggleFavorite, isFavorite } from '../utils/localFavorites.js';

const API_BASE = 'https://tasty-treats-backend.p.goit.global/api';

function $(sel, root = document) {
  return root.querySelector(sel);
}
function createEl(tag, attrs = {}) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function lockScroll() {
  document.body.style.overflow = 'hidden';
}
function unlockScroll() {
  document.body.style.overflow = '';
}

async function fetchRecipeById(id) {
  const res = await fetch(`${API_BASE}/recipes/${id}`);
  if (!res.ok) throw new Error('Recipe not found');
  return res.json();
}

/* ==================== CSS inject ==================== */
const cssText = `
:root{
  --rm-radius:16px; --rm-shadow:0 20px 60px rgba(0,0,0,.25);
  --rm-chip-bg:#f1f1f1; --rm-chip-text:#333;
  --rm-primary:#9dc888; --rm-dark:#111; --rm-muted:#7a7a7a; --rm-border:#e9e9e9;
  --rm-scale:1;
}
.rm.hidden{display:none;}
.rm{position:fixed; inset:0; z-index:1000; display:grid; place-items:center;}
.rm__backdrop{position:absolute; inset:0; background:rgba(0,0,0,.6); backdrop-filter:blur(2px);}
.rm__card{
  position:relative; width:531px; height:905px; background:#fff; border-radius:var(--rm-radius);
  box-shadow:var(--rm-shadow); overflow:hidden; transform:scale(var(--rm-scale)); transform-origin:center center;
  display:flex; flex-direction:column; will-change:transform;
}
.rm__close{position:absolute; top:10px; right:10px; width:36px; height:36px; border:0; border-radius:50%;
  background:#eee; cursor:pointer; font-size:16px; z-index:3;}
.rm__content{padding:18px; flex:1 1 auto; min-height:0; overflow:auto;}
.rm__title{font-weight:800; font-size:20px; letter-spacing:.2px; text-transform:uppercase; margin:0 0 10px;}
.rm__media{position:relative; width:100%; height:240px; border-radius:12px; overflow:hidden; background:#111;}
.rm__media img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover;}
.rm__play{position:absolute; inset:0; display:grid; place-items:center; cursor:pointer;}
.rm__play svg{width:44px; height:44px; opacity:.95;}
.rm__player{position:absolute; inset:0; background:#000;}
.rm__player iframe{width:100%; height:100%; border:0;}
.rm__player-close{position:absolute; top:8px; right:8px; width:32px; height:32px; border:0; border-radius:50%;
  background:rgba(0,0,0,.6); color:#fff; cursor:pointer; z-index:4;}
.rm__meta{display:flex; flex-wrap:wrap; gap:8px 10px; align-items:center; margin:10px 0 6px; color:var(--rm-muted); font-size:13px;}
.rm__chips{display:flex; gap:6px; flex-wrap:wrap;}
.rm__chip{background:var(--rm-chip-bg); color:var(--rm-chip-text); border-radius:999px; padding:3px 8px; font-size:11px; font-weight:600;}
.rm__rating{display:flex; align-items:center; gap:6px;}
.rm__rating .val{font-weight:700; font-size:14px;}
.rm__stars{position:relative; font-size:16px; color:#cfcfcf; line-height:1;}
.rm__stars .filled{position:absolute; left:0; top:0; white-space:nowrap; overflow:hidden; color:#ffc700; width:var(--rating,0%);}
.rm__grid{display:grid; gap:12px; grid-template-columns:1fr; margin-top:6px;}
.rm__table{border:1px solid var(--rm-border); border-radius:12px; overflow:hidden;}
.rm__row{display:grid; grid-template-columns:1fr auto; gap:10px; padding:9px 12px; border-bottom:1px solid var(--rm-border);}
.rm__row:last-child{border-bottom:0;}
.rm__ing{font-weight:600; color:#111; font-size:14px;}
.rm__measure{color:var(--rm-muted); font-size:13px;}
.rm__instructions{margin-top:10px; color:#333; line-height:1.5; font-size:14px;}
.rm__actions{display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-start; margin-top:14px;}
.rm__btn{display:inline-flex; align-items:center; gap:8px; padding:10px 16px; border-radius:999px; font-weight:700; cursor:pointer; border:1px solid transparent; font-size:14px;}
.rm__btn--primary{background:var(--rm-primary); color:#fff;}
.rm__btn--ghost{background:#fff; color:#111; border-color:var(--rm-primary);}
.rm__heart{position:absolute; top:10px; left:10px; z-index:2; background:transparent; border:0; cursor:pointer;}
.rm__heart svg{stroke:#fff; fill:rgba(255,255,255,.4); transition:.2s;}
.rm__heart.active svg{fill:#ff6b6b; stroke:#ff6b6b;}
`;

function ensureStyles() {
  // v2 id: önceki sürüm yüklüyse üzerine yazabilelim
  const id = 'rm-styles-531x905';
  if (document.getElementById(id)) return;
  const style = createEl('style', { id });
  style.textContent = cssText;
  document.head.appendChild(style);
}

/* ================= Modal root ================= */
function ensureModalRoot() {
  let root = $('#recipe-modal');
  if (root) return root;
  root = createEl('div', {
    id: 'recipe-modal',
    class: 'rm hidden',
    'aria-hidden': 'true',
    role: 'dialog',
    'aria-modal': 'true',
  });
  root.innerHTML = `
    <div class="rm__backdrop" data-close="true"></div>
    <div class="rm__card" role="document" aria-labelledby="rm-title" style="--rm-scale:1">
      <button class="rm__close" type="button" aria-label="Close" data-close="true">✕</button>
      <div id="rm-content" class="rm__content"></div>
    </div>
  `;
  document.body.appendChild(root);
  return root;
}

/* ================ Markup helpers ================ */
function chipHtml(tags = []) {
  if (!Array.isArray(tags)) return '';
  return tags
    .slice(0, 6)
    .map(t => {
      const name = typeof t === 'string' ? t : t.name ?? t.title ?? '';
      return name ? `<span class="rm__chip">#${name}</span>` : '';
    })
    .join('');
}
function ingHtml(ingredients = []) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return `<div class="rm__row"><span class="rm__ing">Ingredients</span><span class="rm__measure">—</span></div>`;
  }
  return ingredients
    .map(
      i => `
    <div class="rm__row">
      <span class="rm__ing">${i.name || i.title || '-'}</span>
      <span class="rm__measure">${i.measure || i.quantity || ''}</span>
    </div>
  `
    )
    .join('');
}
function starsHtml(rating = 0) {
  const val = Math.max(0, Math.min(5, Number(rating) || 0));
  const width = (val / 5) * 100;
  return `
    <div class="rm__rating" style="--rating:${width}%">
      <span class="val">${val.toFixed(1)}</span>
      <div class="rm__stars"><span>★★★★★</span><span class="filled">★★★★★</span></div>
    </div>
  `;
}
function playIcon() {
  return `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="white" opacity=".9"></circle>
      <polygon points="26,20 48,32 26,44" fill="#111"></polygon>
    </svg>
  `;
}
function toInstructionsHtml(instructions, description) {
  if (Array.isArray(instructions))
    return instructions.map(x => `<p>${String(x).trim()}</p>`).join('');
  const text = (instructions || description || 'No instructions.')
    .toString()
    .trim();
  return text.replace(/\n/g, '<br>');
}
function getYouTubeId(url = '') {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.searchParams.get('v')) return u.searchParams.get('v');
    const m =
      u.pathname.match(/\/embed\/([^/?#]+)/) ||
      u.pathname.match(/\/v\/([^/?#]+)/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

/* ================ Modal render ================ */
function renderModal(recipe) {
  const {
    _id,
    title,
    thumb,
    rating = 0,
    time,
    tags = [],
    ingredients = [],
    instructions = '',
    description = '',
    youtube,
  } = recipe;
  const favActive = isFavorite(_id) ? 'active' : '';

  return `
    <h3 id="rm-title" class="rm__title">${(
      title || 'Recipe'
    ).toUpperCase()}</h3>

    <div class="rm__media">
      <img src="${thumb || ''}" alt="${
    title || 'Recipe image'
  }" loading="lazy" />
      ${
        youtube
          ? `<div class="rm__play" data-play="yt">${playIcon()}</div>`
          : ''
      }
      <button class="rm__heart ${favActive}" aria-label="Toggle favorite" data-fav="${_id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    </div>

    <div class="rm__meta">
      <div class="rm__chips">${chipHtml(tags)}</div>
      ${starsHtml(rating)}
      ${time ? `<span>• ${time} min</span>` : ''}
    </div>

    <div class="rm__grid">
      <div class="rm__table">
        ${ingHtml(ingredients)}
      </div>
    </div>

    <div class="rm__instructions">
      ${toInstructionsHtml(instructions, description)}
    </div>

    <div class="rm__actions">
      <button class="rm__btn rm__btn--primary" data-action="toggle-fav" data-fav="${_id}">
        ${isFavorite(_id) ? 'Remove favorite' : 'Add to favorite'}
      </button>
      <button class="rm__btn rm__btn--ghost" data-action="rate" data-id="${_id}">
        Give a rating
      </button>
    </div>
  `;
}
function skeleton() {
  return `
    <h3 class="rm__title">Loading…</h3>
    <div class="rm__media"></div>
    <div class="rm__meta"></div>
    <div class="rm__table" style="height:160px;"></div>
    <div class="rm__instructions" style="height:80px;"></div>
  `;
}

/* ============ Open/Close + Scaling ============ */
let modalRoot,
  modalContent,
  currentRecipe = null;
let resizeHandlerBound = null;

function setModalScale() {
  const card = $('.rm__card', modalRoot);
  if (!card) return;
  const vw = window.innerWidth,
    vh = window.innerHeight;
  const pad = 24; // güvenli kenarlar
  const scale = Math.min((vw - pad * 2) / 531, (vh - pad * 2) / 905, 1);
  card.style.setProperty('--rm-scale', String(Math.max(0.5, scale)));
}

function openModalWithId(id) {
  ensureStyles();
  modalRoot = ensureModalRoot();
  modalContent = $('#rm-content', modalRoot);

  modalContent.innerHTML = skeleton();
  modalRoot.classList.remove('hidden');
  modalRoot.setAttribute('aria-hidden', 'false');
  lockScroll();

  // scale ayarla ve dinleyiciyi bağla
  setModalScale();
  resizeHandlerBound = () => setModalScale();
  window.addEventListener('resize', resizeHandlerBound);
  window.addEventListener('keydown', onEsc);

  fetchRecipeById(id)
    .then(data => {
      currentRecipe = data;
      modalContent.innerHTML = renderModal(data);
    })
    .catch(err => {
      console.error(err);
      currentRecipe = null;
      modalContent.innerHTML = `
        <h3 class="rm__title">Error</h3>
        <p>Recipe details could not be loaded. Please try again.</p>
        <div class="rm__actions">
          <button class="rm__btn rm__btn--primary" data-close="true">Close</button>
        </div>
      `;
    });
}

function closeModal() {
  if (!modalRoot) return;
  modalRoot.classList.add('hidden');
  modalRoot.setAttribute('aria-hidden', 'true');
  $('#rm-content', modalRoot).innerHTML = '';
  currentRecipe = null;
  unlockScroll();
  window.removeEventListener('keydown', onEsc);
  if (resizeHandlerBound)
    window.removeEventListener('resize', resizeHandlerBound);
}
function onEsc(e) {
  if (e.key === 'Escape') closeModal();
}

/* ============ Events ============ */
// Modal içi tıklamalar
document.addEventListener('click', e => {
  // Modal açıksa
  if (modalRoot && !modalRoot.classList.contains('hidden')) {
    const t = e.target;

    if (t.closest('[data-close="true"]') || t.closest('.rm__backdrop')) {
      closeModal();
      return;
    }

    // Favorite toggle (modal heart + primary button)
    const favBtn = t.closest('[data-fav]');
    if (favBtn && currentRecipe) {
      toggleFavorite(currentRecipe);
      const id = currentRecipe._id;
      const heart = $('.rm__heart', modalRoot);
      if (heart) heart.classList.toggle('active', isFavorite(id));
      const toggleBtn = $('[data-action="toggle-fav"]', modalRoot);
      if (toggleBtn)
        toggleBtn.textContent = isFavorite(id)
          ? 'Remove favorite'
          : 'Add to favorite';
      const cardHeart = document.querySelector(
        `.recipe-card[data-id="${id}"] .heart-btn`
      );
      if (cardHeart) cardHeart.classList.toggle('active', isFavorite(id));
      return;
    }

    // Rate placeholder
    const rateBtn = t.closest('[data-action="rate"]');
    if (rateBtn) {
      alert('Rating flow coming soon ✨');
      return;
    }

    // YouTube in-modal player
    const play = t.closest('[data-play="yt"]');
    if (play && currentRecipe?.youtube) {
      const id = getYouTubeId(currentRecipe.youtube);
      if (!id) return;
      const media = $('.rm__media', modalRoot);
      if (!media || media.querySelector('.rm__player')) return;
      const player = createEl('div', { class: 'rm__player' });
      player.innerHTML = `
        <button class="rm__player-close" aria-label="Close video">✕</button>
        <iframe
          src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1"
          title="YouTube video player"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        ></iframe>`;
      media.appendChild(player);
      return;
    }

    // Close player
    if (t.closest('.rm__player-close')) {
      const p = t.closest('.rm__player');
      if (p) p.remove();
      return;
    }
  }
});

// Mevcut koda dokunmadan: "See recipe" butonuna bağlan
document.addEventListener('click', e => {
  const btn = e.target.closest('.recipe-card-button');
  if (!btn) return;
  const card = btn.closest('.recipe-card');
  if (!card) return;
  const id = card.dataset.id;
  if (!id) return;
  openModalWithId(id);
});
