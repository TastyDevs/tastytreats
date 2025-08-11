// recipes-filter.js
// --- API'yi direkt import et ---
import {
  fetchFilteredRecipes,
  fetchAreas,
  fetchIngredients,
} from '../api/tastyTreatsApi.js';

// ---- Elementler
const root = document.querySelector('.filters');
if (!root) console.warn('[filters] .filters bulunamadı.');

// Filtre modunun pagination'ı (HTML'de <div id="pagination-filters">)
const paginationContainer =
  document.getElementById('pagination-filters') ||
  document.getElementById('pagination'); // son çare, ama asıl hedef -filters

const el = {
  search: root?.querySelector('.filter-input'),
  searchBtn: root?.querySelector('.search-btn'),
  resetBtn: root?.querySelector('.reset-filter'),
  dropdowns: [...(root?.querySelectorAll('.custom-dropdown') ?? [])],
  recipes: document.getElementById('recipes-flex'), // bizim grid
};

// Kategoriler modunun alanları (native)
const native = {
  grid: document.getElementById('recipes-container'),
  pagination: document.getElementById('pagination'),
};

const USE_LOCAL_RENDER = !!el.recipes;

// ---- Durum
const state = {
  query: '',
  time: '', // "40"
  area: '', // "Italian"
  ingredient: '', // _id
  ingredientLabel: '',
  page: 1,
  limit: 6,
  loading: false,
};

const timeOptions = ['10 min', '20 min', '30 min', '40 min'];

/* ---------- Yardımcılar ---------- */
function setLoading(isLoading) {
  state.loading = isLoading;
  if (!USE_LOCAL_RENDER || !el.recipes) return;
  if (isLoading)
    el.recipes.innerHTML = `<div class="recipes-loading">Loading...</div>`;
}

const FETCH_TIMEOUT_MS = 10000;
const withTimeout = (p, ms = FETCH_TIMEOUT_MS) =>
  Promise.race([
    p,
    new Promise((_, r) =>
      setTimeout(() => r(new Error('REQUEST_TIMEOUT')), ms)
    ),
  ]);

function parseTimeLabelToMinutes(label) {
  const m = String(label).match(/\d+/);
  return m ? m[0] : '';
}
function closeAllMenus(except) {
  el.dropdowns.forEach(dd => {
    if (dd !== except) dd.classList.remove('open');
  });
}
function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Filtre aktif mi? (arama veya herhangi bir dropdown seçiliyse)
function isFiltersActive() {
  return !!(state.query || state.time || state.area || state.ingredient);
}
function showFiltersMode() {
  if (native.grid) native.grid.style.display = 'none';
  if (native.pagination) native.pagination.style.display = 'none';
  if (el.recipes) el.recipes.style.display = ''; // bizim grid görünür
  if (paginationContainer) paginationContainer.style.display = ''; // bizim pagination görünür
  document.dispatchEvent(new CustomEvent('filters:activate'));
}
function showNativeMode() {
  if (el.recipes) el.recipes.style.display = 'none';
  if (paginationContainer) paginationContainer.style.display = 'none';
  if (native.grid) native.grid.style.display = '';
  if (native.pagination) native.pagination.style.display = '';
  document.dispatchEvent(new CustomEvent('filters:deactivate'));
}

/* ---------- Rendererlar ---------- */
function renderPagination(totalPages, currentPage) {
  if (!paginationContainer) return;

  totalPages = Math.max(1, Number(totalPages) || 1);
  currentPage = Math.min(totalPages, Math.max(1, Number(currentPage) || 1));

  const pagesToShow = 1;
  const arrowClassesPrev = 'pagination-btn arrow-btn arrow-prev';
  const arrowClassesNext = 'pagination-btn arrow-btn arrow-next';

  let markup = `
    <button class="${arrowClassesPrev}" data-page="1" ${
    currentPage === 1 ? 'disabled' : ''
  }>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
    </button>
    <button class="${arrowClassesPrev}" data-page="${currentPage - 1}" ${
    currentPage === 1 ? 'disabled' : ''
  }>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
  `;

  if (totalPages > 1) {
    if (currentPage > pagesToShow + 2) {
      markup += `<button class="pagination-btn page-btn" data-page="1">1</button>`;
      markup += `<button class="pagination-btn dots" disabled>...</button>`;
    }

    for (
      let i = Math.max(1, currentPage - pagesToShow);
      i <= Math.min(totalPages, currentPage + pagesToShow);
      i++
    ) {
      if (i === 1 && currentPage > pagesToShow + 2) continue;
      if (i === totalPages && currentPage < totalPages - pagesToShow - 1)
        continue;

      markup += `<button class="pagination-btn page-btn ${
        i === currentPage ? 'active' : ''
      }" data-page="${i}">${i}</button>`;
    }

    if (currentPage < totalPages - pagesToShow - 1) {
      markup += `<button class="pagination-btn dots" disabled>...</button>`;
      markup += `<button class="pagination-btn page-btn" data-page="${totalPages}">${totalPages}</button>`;
    }
  }

  markup += `
    <button class="${arrowClassesNext}" data-page="${currentPage + 1}" ${
    currentPage === totalPages ? 'disabled' : ''
  }>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
    <button class="${arrowClassesNext}" data-page="${totalPages}" ${
    currentPage === totalPages ? 'disabled' : ''
  }>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
    </button>
  `;

  paginationContainer.innerHTML = totalPages <= 1 ? '' : markup;
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
        description = '',
        rating = 0,
        preview,
        thumb,
      } = rec;

      const img = preview || thumb || '';
      const safeTitle = escapeHtml(title);
      const safeDesc = escapeHtml(description);
      const ratingNum = Number(rating) || 0;
      const ratingPct = Math.max(0, Math.min(100, (ratingNum / 5) * 100));

      return `
      <div class="recipe-card" data-id="${_id || ''}">
        <button class="heart-btn" aria-label="Add to favorites">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        ${
          img
            ? `<img class="recipe-card-image" src="${img}" alt="${safeTitle}" loading="lazy">`
            : ''
        }

        <div class="recipe-card-details">
          <h3 class="recipe-card-title">${safeTitle}</h3>
          ${
            safeDesc ? `<p class="recipe-card-description">${safeDesc}</p>` : ''
          }

          <div class="recipe-card-footer">
            <div class="recipe-card-rating">
              <span class="rating-value">${ratingNum.toFixed(1)}</span>
              <div class="rating-stars" style="--rating:${ratingPct}%">
                <span>★★★★★</span>
                <span class="stars-filled">★★★★★</span>
              </div>
            </div>
            <button class="recipe-card-button" type="button">See recipe</button>
          </div>
        </div>
      </div>`;
    })
    .join('');

  el.recipes.innerHTML = html;
}

/* ---------- FETCH + RENDER (önce tanımlı!) ---------- */
async function applyFilters() {
  try {
    // Filtre/arama yoksa native liste/paginasyon açık kalsın; fetch yapma
    if (!isFiltersActive()) {
      showNativeMode();
      return;
    }

    showFiltersMode();
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

      // Pagination hesapla ve çiz
      if (paginationContainer) {
        const apiTotalPages =
          Number(data?.totalPages) || Number(data?.pageCount) || 0;

        const totalItems =
          Number(data?.total) ||
          Number(data?.count) ||
          Number(data?.resultsCount) ||
          Number(data?.hits) ||
          (Array.isArray(data?.results) ? data.results.length : 0);

        const totalPages =
          apiTotalPages ||
          Math.max(
            1,
            Math.ceil((totalItems || filtered.length) / (limit || 6))
          );

        renderPagination(totalPages, state.page);
      }

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

/* ---------- Dropdownlar ---------- */
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

function populateDropdown(type, items /* [{value,label}] */) {
  const dd = el.dropdowns.find(d => d.dataset.type === type);
  if (!dd) return;
  const menu = dd.querySelector('.dropdown-menu');
  const toggle = dd.querySelector('.dropdown-toggle');
  if (!menu || !toggle) return;

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
    applyFilters(); // seçimle birlikte bizim mod devreye girer
  });
}

/* ---------- Global kapatma ---------- */
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

/* ---------- Search ---------- */
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

/* ---------- Reset ---------- */
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
    applyFilters(); // filtre pasif => native moda dön
  });
}

/* ---------- Başlat ---------- */
(async function init() {
  try {
    if (el.recipes) {
      el.recipes.classList.add('recipes-list'); // grid görünümü için
      el.recipes.style.display = 'none'; // ilk açılışta native kalsın
    }
    if (paginationContainer) paginationContainer.style.display = 'none';

    await initDropdowns();
    initSearch();
    initReset();
    await applyFilters(); // filtre pasif => native mod

    // Pagination tıklama
    if (paginationContainer) {
      paginationContainer.addEventListener('click', e => {
        const btn = e.target.closest('.pagination-btn');
        if (!btn || btn.classList.contains('dots')) return;

        const page = parseInt(btn.dataset.page, 10);
        if (!isNaN(page) && page !== state.page) {
          state.page = page;
          applyFilters();
        }
      });
    }

    // Kalp butonuna tıklama
    document.addEventListener('click', e => {
      const btn = e.target.closest('.heart-btn');
      if (btn) {
        btn.classList.toggle('active');
        // burada favori ekleme/çıkarma işlemlerini yapabilirsin
      }
    });

    // "See recipe" butonuna tıklama
    document.addEventListener('click', e => {
      const btn = e.target.closest('.recipe-card-button');
      if (btn) {
        const card = btn.closest('.recipe-card');
        const id = card?.dataset.id;
        if (id) {
          console.log('Recipe clicked:', id);
          // Burada id ile detay sayfasına yönlendirebilir veya modal açabilirsin
        }
      }
    });
  } catch (e) {
    console.error('[filters] init error:', e);
    if (el.recipes)
      el.recipes.innerHTML = `<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>`;
  }
})();
