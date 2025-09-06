function $(s, r = document) {
  return r.querySelector(s);
}
function el(tag, attrs = {}) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  return e;
}

/* ============== CSS inject ============== */
const css = `
.rmini.hidden{display:none;}
.rmini{position:fixed; inset:0; z-index:1200; display:grid; place-items:center;}
.rmini__backdrop{position:absolute; inset:0; background:rgba(0,0,0,.6); backdrop-filter:blur(1px);}
.rmini__card{
  position:relative; width:424px; height:254px; background:#fff; border-radius:14px;
  box-shadow:0 18px 50px rgba(0,0,0,.25); padding:16px 18px; display:flex; flex-direction:column; gap:10px;
}
.rmini__close{position:absolute; top:10px; right:10px; width:28px; height:28px; border:0; border-radius:50%; background:#eee; cursor:pointer;}
.rmini__title{margin:0; font-weight:800; font-size:16px;}
.rmini__rating{display:flex; align-items:center; gap:10px;}
.rmini__val{min-width:36px; font-weight:700;}
.rmini__stars{display:flex; gap:6px;}
.rmini__star{
  appearance:none; border:0; background:transparent; cursor:pointer; font-size:22px; line-height:1;
  padding:0 2px; color:#cfcfcf; transition:transform .1s ease, color .1s ease;
}
.rmini__star.is-active, .rmini__star.is-hover{ color:#ffc700; transform:translateY(-1px); }
.rmini__input{
  width:100%; height:44px; border:1px solid #e5e5e5; border-radius:999px; padding:0 14px; font-size:14px; outline:none;
}
.rmini__input:focus{border-color:#9dc888; box-shadow:0 0 0 3px rgba(157,200,136,.2);}
.rmini__btn{
  margin-top:auto; width:100%; height:48px; border-radius:999px; border:0; cursor:pointer; font-weight:700; font-size:15px;
  background:#9dc888; color:#fff;
}
@media (max-width:460px){ .rmini__card{ transform: scale(.96); width:424px; height:254px; } }
`;
(function ensureStyles() {
  if (document.getElementById('rmini-styles')) return;
  const s = el('style', { id: 'rmini-styles' });
  s.textContent = css;
  document.head.appendChild(s);
})();

/* ============== Root inject ============== */
function ensureRoot() {
  let root = $('#rating-mini');
  if (root) return root;
  root = el('div', {
    id: 'rating-mini',
    class: 'rmini hidden',
    'aria-hidden': 'true',
    role: 'dialog',
    'aria-modal': 'true',
  });
  root.innerHTML = `
    <div class="rmini__backdrop" data-close="true"></div>
    <div class="rmini__card" role="document" aria-labelledby="rmini-title">
      <button class="rmini__close" type="button" aria-label="Close" data-close="true">✕</button>

      <h3 id="rmini-title" class="rmini__title">Rating</h3>

      <div class="rmini__rating">
        <div class="rmini__val" id="rmini-val">0.0</div>
        <div class="rmini__stars" role="radiogroup" aria-label="Rating">
          ${[1, 2, 3, 4, 5]
            .map(
              n =>
                `<button type="button" class="rmini__star" data-val="${n}" aria-label="${n} star">★</button>`
            )
            .join('')}
        </div>
      </div>

      <input type="email" class="rmini__input" id="rmini-email" placeholder="Enter email" autocomplete="email" />

      <button class="rmini__btn" id="rmini-send">Send</button>
    </div>
  `;
  document.body.appendChild(root);
  return root;
}

/* ============== Logic ============== */
let rRoot,
  currentId = null,
  currentVal = 0;

function openMini(id) {
  rRoot = ensureRoot();
  currentId = id;
  currentVal = 0;

  // reset
  $('#rmini-val', rRoot).textContent = '0.0';
  rRoot
    .querySelectorAll('.rmini__star')
    .forEach(s => s.classList.remove('is-active', 'is-hover'));
  $('#rmini-email', rRoot).value = '';

  rRoot.classList.remove('hidden');
  rRoot.setAttribute('aria-hidden', 'false');
}
function closeMini() {
  if (!rRoot) return;
  rRoot.classList.add('hidden');
  rRoot.setAttribute('aria-hidden', 'true');
  currentId = null;
  currentVal = 0;
}

// İç eventler
document.addEventListener('click', e => {
  if (!rRoot || rRoot.classList.contains('hidden')) return;
  const t = e.target;

  if (t.closest('[data-close="true"]') || t.closest('.rmini__backdrop')) {
    closeMini();
    return;
  }

  // yıldızlar
  const star = t.closest('.rmini__star');
  if (star) {
    const stars = rRoot.querySelectorAll('.rmini__star');
    const v = Number(star.dataset.val);
    currentVal = v;
    stars.forEach(s =>
      s.classList.toggle('is-active', Number(s.dataset.val) <= v)
    );
    $('#rmini-val', rRoot).textContent = `${v.toFixed(1)}`;
    return;
  }

  // send
  if (t.id === 'rmini-send') {
    if (!currentVal) {
      alert('Please select a rating.');
      return;
    }
    const email = $('#rmini-email', rRoot).value.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmail) {
      alert('Please enter a valid email.');
      return;
    }

    // TODO: burada API POST /recipes/:id/rating (rate, email) eklenebilir.
    // Şimdilik log + kapat:
    console.log('rating submit', { id: currentId, rate: currentVal, email });
    closeMini();
  }
});

// yıldız hover (önizleme)
document.addEventListener('mouseover', e => {
  if (!rRoot || rRoot.classList.contains('hidden')) return;
  const star = e.target.closest('.rmini__star');
  if (!star) return;
  const v = Number(star.dataset.val);
  rRoot
    .querySelectorAll('.rmini__star')
    .forEach(s => s.classList.toggle('is-hover', Number(s.dataset.val) <= v));
});
document.addEventListener('mouseout', e => {
  if (!rRoot || rRoot.classList.contains('hidden')) return;
  if (e.target.closest('.rmini__star')) {
    rRoot
      .querySelectorAll('.rmini__star')
      .forEach(s => s.classList.remove('is-hover'));
  }
});

// recipeModal içindeki "Give a rating" tıklamasını yakala (CAPTURE, alert'i engelle)
document.addEventListener(
  'click',
  e => {
    const btn = e.target.closest('[data-action="rate"]');
    if (!btn) return;
    const id =
      btn.getAttribute('data-id') || btn.getAttribute('data-fav') || null;
    if (!id) return;
    e.preventDefault();
    e.stopPropagation();
    openMini(id);
  },
  true
); // CAPTURE fazı
