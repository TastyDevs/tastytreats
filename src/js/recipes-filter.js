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
  limit: 6, // API limiti; ekranda görünen kart sayısını ayrıca sınırlıyoruz
  loading: false,

  // responsive render için
  lastItems: [],
  favs: new Set(),
};

// --- Favorites (localStorage)
const FAV_KEY = 'tt:favorites';

const readFavs = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]'));
  } catch {
    return new Set();
  }
};
const writeFavs = set => {
  localStorage.setItem(FAV_KEY, JSON.stringify([...set]));
};
const isFavorite = id => state.favs.has(id);

// toggle -> true: eklendi, false: çıkarıldı, null: id yok
const toggleFavorite = id => {
  if (!id) return null;
  const wasFav = state.favs.has(id);
  if (wasFav) state.favs.delete(id);
  else state.favs.add(id);
  writeFavs(state.favs);
  return !wasFav;
};

state.favs = readFavs();

/* ---------- FAVORI SENKRON + TEMIZLE ---------- */
// storage'taki saçma id'leri temizle ("" / "null" / "undefined")
function sanitizeFavorites() {
  const cleaned = [...state.favs].filter(
    id => id && id !== 'null' && id !== 'undefined'
  );
  if (cleaned.length !== state.favs.size) {
    state.favs = new Set(cleaned);
    writeFavs(state.favs);
  }
}
// Sayfadaki kalpleri storage'a göre hizala
function syncHeartsWithFavorites(scope = document) {
  const hearts = scope.querySelectorAll('.heart-btn');
  hearts.forEach(btn => {
    const id = btn.closest('[data-id]')?.dataset.id?.trim();
    const shouldBeActive = !!id && isFavorite(id);
    btn.classList.toggle('active', shouldBeActive);
  });
}
sanitizeFavorites();

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

// Ekrana göre kart limiti (D:9 / T:8 / M:6)
function getCardLimitByViewport() {
  const w = window.innerWidth || 1200;
  if (w >= 1024) return 9; // Desktop: 3x3
  if (w >= 768) return 8; // Tablet: 2x4
  return 6; // Mobile
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

  const limitByViewport = getCardLimitByViewport();
  const list = Array.isArray(items) ? items.slice(0, limitByViewport) : [];

  if (!list.length) {
    el.recipes.innerHTML = '';
    return;
  }

  const html = list
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
      const activeClass = isFavorite(_id) ? 'active' : '';

      return `
      <div class="recipe-card" data-id="${_id || ''}">
        <button class="heart-btn ${activeClass}" aria-label="Add to favorites">
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

  // Yeni basılan kartları storage'a göre hizala
  syncHeartsWithFavorites(el.recipes);
}

/* ---------- FETCH + RENDER (önce tanımlı!) ---------- */
async function applyFilters() {
  try {
    if (!isFiltersActive()) {
      showNativeMode();
      return;
    }

    showFiltersMode();
    setLoading(true);

    // ---- Dinamik limit ----
    const pageSize = getCardLimitByViewport();
    state.limit = pageSize; // state’i güncel tut
    const { time, area, ingredient, page } = state;

    const data = await withTimeout(
      fetchFilteredRecipes({ time, area, ingredient, page, limit: pageSize })
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

    state.lastItems = filtered;

    if (USE_LOCAL_RENDER) {
      renderRecipes(filtered.slice(0, pageSize));

      // ---- Pagination hesapları ----
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
          Math.max(1, Math.ceil((totalItems || filtered.length) / pageSize));

        renderPagination(totalPages, state.page);
      }

      if (!filtered.length && el.recipes)
        el.recipes.innerHTML = '<p class="no-results">No recipes found</p>';
    }

    document.dispatchEvent(
      new CustomEvent('recipes:filtered', {
        detail: {
          recipes: filtered,
          paging: { page, limit: pageSize },
          raw: data,
        },
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
    setLoading(false);
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

// Varsayılan dropdown metinlerini sakla
const defaultDropdownLabels = {};
(el.dropdowns || []).forEach(dd => {
  const type = dd.dataset.type; // time | area | ingredient
  const toggle = dd.querySelector('.dropdown-toggle');
  if (type && toggle) {
    defaultDropdownLabels[type] =
      toggle.getAttribute('data-default') || toggle.textContent.trim();
  }
});

function initReset() {
  if (!el.resetBtn) return;
  el.resetBtn.addEventListener('click', () => {
    // State'i temizle
    state.query = '';
    state.time = '';
    state.area = '';
    state.ingredient = '';
    state.ingredientLabel = '';
    state.page = 1;

    // Arama input'unu temizle
    if (el.search) el.search.value = '';

    // Dropdown metinlerini ve seçili öğeleri sıfırla
    (el.dropdowns || []).forEach(dd => {
      const type = dd.dataset.type;
      const toggle = dd.querySelector('.dropdown-toggle');
      const menu = dd.querySelector('.dropdown-menu');
      if (toggle) {
        toggle.textContent = defaultDropdownLabels[type] || 'Select';
      }
      menu
        ?.querySelectorAll('.selected')
        .forEach(n => n.classList.remove('selected'));
      dd.classList.remove('open');
    });

    // Filtreyi sıfırlayıp native moda dön
    applyFilters();
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

    // İlk yüklemede var olan kalpleri storage'a hizala
    syncHeartsWithFavorites();

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

    // Kalp butonu: güvenli ID ile toggle + UI senkron
    document.addEventListener('click', e => {
      const heart = e.target.closest('.heart-btn');
      if (!heart) return;

      // En yakın data-id taşıyan ata üzerinden id al
      const host = heart.closest('[data-id]');
      const id = host?.dataset.id?.trim();

      if (!id) {
        console.warn('[favorites] data-id bulunamadı; işlem yapılmadı.');
        return;
      }

      const nowFav = toggleFavorite(id); // true: eklendi, false: çıkarıldı
      if (nowFav === null) return;

      heart.classList.toggle('active', nowFav);
    });

    // (Opsiyonel) "Favorites" menü linkine tıklama
    document
      .querySelector('.nav-link[href="./favorites.html"]')
      ?.addEventListener('click', () => {
        console.log('Favorites link clicked, redirecting...');
      });

    // "See recipe" butonuna tıklama
    document.addEventListener('click', e => {
      const btn = e.target.closest('.recipe-card-button');
      if (btn) {
        const card = btn.closest('.recipe-card');
        const id = card?.dataset.id;
        if (id) {
          console.log('Recipe clicked:', id);
          // burada id ile detay sayfasına yönlendirebilirsin
        }
      }
    });

    // Resize'da son sonuçları kart limitine göre tekrar çiz
    window.addEventListener('resize', () => {
      if (!state.lastItems?.length) return;
      renderRecipes(state.lastItems);
    });
  } catch (e) {
    console.error('[filters] init error:', e);
    if (el.recipes)
      el.recipes.innerHTML = `<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>`;
  }
})();
