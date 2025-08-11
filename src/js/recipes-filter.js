let fetchFilteredRecipes, fetchAreas, fetchIngredients;

async function loadApi() {
  const candidates = [
    '../api/tastyTreatsApi.js', // js -> api
  ];
  for (const spec of candidates) {
    try {
      const m = await import(spec);
      ({ fetchFilteredRecipes, fetchAreas, fetchIngredients } = m);
      console.log('[filters] API loaded from', spec);
      return;
    } catch (_) {}
  }
  throw new Error('API module not found. Check tastyTreatsApi.js path.');
}

// Elementler (sadece #recipes-flex'e bas)
const root = document.querySelector('.filters');
if (!root) console.warn('[filters] .filters bulunamadı.');

const el = {
  search: root?.querySelector('.filter-input'),
  searchBtn: root?.querySelector('.search-btn'),
  resetBtn: root?.querySelector('.reset-filter'),
  dropdowns: [...(root?.querySelectorAll('.custom-dropdown') ?? [])],
  recipes: document.getElementById('recipes-flex'),
};

const USE_LOCAL_RENDER = !!el.recipes;

// Durum
const state = {
  query: '',
  time: '', // dakika (string "40")
  area: '', // "Italian"
  ingredient: '', // API'ye _id
  ingredientLabel: '', // toggle göstermek için
  page: 1,
  limit: 6,
  loading: false,
};

const timeOptions = ['10 min', '20 min', '30 min', '40 min'];

// Loading sadece gösterirken yazsın
function setLoading(isLoading) {
  state.loading = isLoading;
  if (!USE_LOCAL_RENDER || !el.recipes) return;
  if (isLoading)
    el.recipes.innerHTML = `<div class="recipes-loading">Loading...</div>`;
}

function parseTimeLabelToMinutes(label) {
  const m = String(label).match(/\d+/);
  return m ? m[0] : '';
}

function closeAllMenus(except) {
  el.dropdowns.forEach(dd => {
    if (dd !== except) dd.classList.remove('open');
  });
}

// Dropdown verileri
async function initDropdowns() {
  // Time (statik)
  populateDropdown(
    'time',
    timeOptions.map(t => ({ value: parseTimeLabelToMinutes(t), label: t }))
  );

  // Area (isimle)
  try {
    const areas = await fetchAreas();
    const list = (Array.isArray(areas) ? areas : [])
      .map(a => (typeof a === 'string' ? a : a?.name))
      .filter(Boolean)
      .map(name => ({ value: name, label: name }));
    populateDropdown('area', list);
  } catch (e) {
    console.error('Areas yüklenemedi', e);
    populateDropdown('area', []);
  }

  // Ingredient (_id gönder, label name)
  try {
    const ingredients = await fetchIngredients();
    const list = (Array.isArray(ingredients) ? ingredients : [])
      .filter(i => i?._id && i?.name)
      .map(i => ({ value: i._id, label: i.name }));
    populateDropdown('ingredient', list);
  } catch (e) {
    console.error('Ingredients yüklenemedi', e);
    populateDropdown('ingredient', []);
  }
}

// Genel dropdown
function populateDropdown(type, items /* [{value,label}] */) {
  const dd = el.dropdowns.find(d => d.dataset.type === type);
  if (!dd) return;
  const menu = dd.querySelector('.dropdown-menu');
  const toggle = dd.querySelector('.dropdown-toggle');
  if (!menu || !toggle) return;

  // SADECE gerçek seçenekler
  menu.innerHTML = (items || [])
    .map(
      opt =>
        `<li><button type="button" data-value="${escapeHtml(
          opt.value
        )}" data-label="${escapeHtml(opt.label)}">${escapeHtml(
          opt.label
        )}</button></li>`
    )
    .join('');

  // Aç/Kapat
  toggle.addEventListener('click', () => {
    const willOpen = !dd.classList.contains('open');
    closeAllMenus();
    dd.classList.toggle('open', willOpen);
  });

  // Seçim
  menu.addEventListener('click', e => {
    const btn = e.target.closest('button[data-value]');
    if (!btn) return;
    const value = btn.getAttribute('data-value') ?? '';
    const label = btn.getAttribute('data-label') ?? btn.textContent.trim();

    if (type === 'time') {
      state.time = value;
    } else if (type === 'area') {
      state.area = label;
    } else if (type === 'ingredient') {
      state.ingredient = value;
      state.ingredientLabel = label;
    }

    toggle.textContent = label;
    dd.classList.remove('open');
    state.page = 1;
    applyFilters();
  });
}

// Dışarı tık + Esc ile kapat
document.addEventListener('click', e => {
  const current = e.target.closest('.custom-dropdown');
  if (!current) return closeAllMenus();
  el.dropdowns.forEach(dd => {
    if (dd !== current) dd.classList.remove('open');
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllMenus();
});

// Search
function initSearch() {
  if (!el.search || !el.searchBtn) return;
  const run = () => {
    state.query = el.search.value.trim();
    state.page = 1;
    applyFilters();
  };
  el.searchBtn.addEventListener('click', run);
  el.search.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      run();
    }
  });
}

//  Reset (yalnızca state’i temizle)
function initReset() {
  if (!el.resetBtn) return;
  el.resetBtn.addEventListener('click', () => {
    state.query = '';
    state.time = '';
    state.area = '';
    state.ingredient = '';
    state.ingredientLabel = '';
    state.page = 1;
    if (el.search) el.search.value = '';
    applyFilters();
  });
}

// ---- Fetch + render (+ timeout)
const FETCH_TIMEOUT_MS = 10000;
const withTimeout = (p, ms = FETCH_TIMEOUT_MS) =>
  Promise.race([
    p,
    new Promise((_, r) =>
      setTimeout(() => r(new Error('REQUEST_TIMEOUT')), ms)
    ),
  ]);

async function applyFilters() {
  try {
    setLoading(true);

    const { time, area, ingredient, page, limit } = state;
    const data = await withTimeout(
      fetchFilteredRecipes({ time, area, ingredient, page, limit })
    );

    const list = Array.isArray(data?.results)
      ? data.results
      : Array.isArray(data)
      ? data
      : Array.isArray(data?.recipes)
      ? data.recipes
      : [];

    const q = state.query.toLowerCase();
    const filtered = q
      ? list.filter(r =>
          String(r.title || '')
            .toLowerCase()
            .includes(q)
        )
      : list;

    if (USE_LOCAL_RENDER) {
      renderRecipes(filtered);
      if (!filtered.length && el.recipes)
        el.recipes.innerHTML = '<p class="no-results">No recipes found</p>';
    }

    document.dispatchEvent(
      new CustomEvent('recipes:filtered', {
        detail: { recipes: filtered, paging: { page, limit }, raw: data },
      })
    );
  } catch (err) {
    console.error('[filters] applyFilters error:', err?.message || err);
    if (USE_LOCAL_RENDER && el.recipes) {
      el.recipes.innerHTML =
        err?.message === 'REQUEST_TIMEOUT'
          ? `<p class="no-results">İstek zaman aşımına uğradı. Lütfen tekrar deneyin.</p>`
          : `<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>`;
    }
    document.dispatchEvent(
      new CustomEvent('recipes:filtered', {
        detail: {
          recipes: [],
          error: true,
          reason: err?.message || String(err),
        },
      })
    );
  } finally {
    setLoading(false); // DOM'u silmiyor
  }
}

function renderRecipes(items) {
  if (!el.recipes) return;
  if (!items?.length) {
    el.recipes.innerHTML = '';
    return;
  }

  const html = items
    .map(rec => {
      const {
        _id,
        title = 'Untitled',
        time = '',
        rating = '',
        preview,
        thumb,
        description = '',
      } = rec;
      const img = preview || thumb || '';
      return `
      <article class="recipe-card" data-id="${_id || ''}">
        <div class="recipe-thumb">
          ${
            img
              ? `<img src="${img}" alt="${escapeHtml(title)}" loading="lazy">`
              : ''
          }
        </div>
        <div class="recipe-body">
          <h3 class="recipe-title">${escapeHtml(title)}</h3>
          <div class="recipe-meta">
            ${time ? `<span class="badge time">${time} min</span>` : ''}
            ${rating ? `<span class="badge rating">★ ${rating}</span>` : ''}
          </div>
          ${
            description
              ? `<p class="recipe-desc">${escapeHtml(description)}</p>`
              : ''
          }
        </div>
      </article>`;
    })
    .join('');

  el.recipes.innerHTML = html;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// ---- Başlat
(async function init() {
  try {
    await loadApi(); //
    await initDropdowns();
    initSearch();
    initReset();
    await applyFilters();
  } catch (e) {
    console.error('[filters] init error:', e);
    if (el.recipes)
      el.recipes.innerHTML = `<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>`;
  }
})();
