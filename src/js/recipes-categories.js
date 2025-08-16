import { fetchFilteredRecipes, fetchCategories } from '../api/tastyTreatsApi.js';

// --- FAVORİ YÖNETİMİ ---
const FAVORITES_KEY = 'favoriteRecipes';

function getFavorites() {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

function addFavorite(recipe) {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav._id === recipe._id)) {
    favorites.push(recipe);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

function removeFavorite(recipeId) {
  let favorites = getFavorites();
  favorites = favorites.filter(recipe => recipe._id !== recipeId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(recipeId) {
  const favorites = getFavorites();
  return favorites.some(recipe => recipe._id === recipeId);
}

function toggleFavorite(recipe) {
  if (isFavorite(recipe._id)) {
    removeFavorite(recipe._id);
  } else {
    addFavorite(recipe);
  }
}

// --- DOM ELEMENTLERİ ---
const recipesContainer = document.querySelector('#recipes-container');
const paginationContainer = document.querySelector('#pagination');
const categoryList = document.querySelector('#category-list');
const allCategoriesBtn = document.querySelector('.categories-box');

let categoryRecipes = [];
let currentPage = 1;
let totalPages = 1;
let selectedCategory = null;
let limit = calculateLimit();

// --- KART MARKUP ---
function createRecipeCardMarkup(recipe) {
  const ratingValue = (recipe.rating / 5) * 100;
  const isActive = isFavorite(recipe._id) ? 'active' : '';
  return `
    <div class="recipe-card" data-id="${recipe._id}">
      <button class="heart-btn ${isActive}" aria-label="Favorite status">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
      <img class="recipe-card-image" src="${recipe.thumb || recipe.preview}" alt="${recipe.title}" loading="lazy">
      <div class="recipe-card-details">
        <h3 class="recipe-card-title">${recipe.title}</h3>
        <p class="recipe-card-description">${recipe.description}</p>
        <div class="recipe-card-footer">
          <div class="recipe-card-rating">
            <span class="rating-value">${recipe.rating.toFixed(1)}</span>
            <div class="rating-stars" style="--rating: ${ratingValue}%">
              <span>★★★★★</span><span class="stars-filled">★★★★★</span>
            </div>
          </div>
          <button class="recipe-card-button" type="button">See recipe</button>
        </div>
      </div>
    </div>`;
}

// --- KARTLARI RENDER ---
function rerenderAllCards(recipes, container) {
  if (!recipes || recipes.length === 0) {
    container.innerHTML = '<p>No recipes found to display.</p>';
    return;
  }

  const markup = recipes.map(createRecipeCardMarkup).join('');
  container.innerHTML = `<div class="recipes-list">${markup}</div>`;

  container.querySelectorAll('.heart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.recipe-card');
      const recipeId = card.dataset.id;
      const recipe = recipes.find(r => r._id === recipeId);
      if (!recipe) return;
      toggleFavorite(recipe);
      btn.classList.toggle('active');
      recipe.isFavorite = isFavorite(recipeId);
    });
  });

  container.querySelectorAll('.recipe-card-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.recipe-card');
      const recipeId = card.dataset.id;
      console.log(`Open recipe details for: ${recipeId}`);
    });
  });
}

// --- PAGINATION ---
const PAGINATION_ICONS = { first: '<<', prev: '<', next: '>', last: '>>' };

function renderPagination(totalPages, currentPage) {
  if (!paginationContainer) return;
  paginationContainer.innerHTML = '';
  if (totalPages <= 1) return;

  const fragment = document.createDocumentFragment();
  const createBtn = (content, className, disabled = false) => {
    const btn = document.createElement('button');
    btn.innerHTML = content;
    btn.className = className;
    if (disabled) btn.disabled = true;
    return btn;
  };

  // << ve < butonları
  fragment.appendChild(createBtn(PAGINATION_ICONS.first, 'pagination-btn first', currentPage === 1));
  fragment.appendChild(createBtn(PAGINATION_ICONS.prev, 'pagination-btn prev', currentPage === 1));

  // Sayfa numaraları
  const pagesToShow = new Set([1, totalPages, currentPage]);
  if (currentPage > 1) pagesToShow.add(currentPage - 1);
  if (currentPage < totalPages) pagesToShow.add(currentPage + 1);

  const sortedPages = Array.from(pagesToShow).filter(n => n > 0 && n <= totalPages).sort((a, b) => a - b);
  let lastPage = 0;
  for (const pageNum of sortedPages) {
    if (lastPage && pageNum > lastPage + 1) {
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      ellipsis.className = 'pagination-ellipsis';
      fragment.appendChild(ellipsis);
    }

    const btn = createBtn(pageNum, 'pagination-btn number');
    if (pageNum === currentPage) btn.classList.add('active');
    fragment.appendChild(btn);
    lastPage = pageNum;
  }

  // > ve >> butonları
  fragment.appendChild(createBtn(PAGINATION_ICONS.next, 'pagination-btn next', currentPage === totalPages));
  fragment.appendChild(createBtn(PAGINATION_ICONS.last, 'pagination-btn last', currentPage === totalPages));

  paginationContainer.appendChild(fragment);
}

// --- LOAD KATEGORİ VE TARİFLER ---
async function loadAndDisplayCategoryRecipes(page = 1) {
  try {
    limit = calculateLimit();

    const allCategoryRecipes = selectedCategory
      ? await fetchFilteredRecipes({ category: selectedCategory, page: 1, limit: 1000 })
      : await fetchFilteredRecipes({ page: 1, limit: 1000 });

    const totalRecipesCount = allCategoryRecipes.totalResults || allCategoryRecipes.results.length;

    const response = selectedCategory
      ? await fetchFilteredRecipes({ page, limit, category: selectedCategory })
      : await fetchFilteredRecipes({ page, limit });

    totalPages = Math.ceil(totalRecipesCount / limit);
    currentPage = page > totalPages ? totalPages : page;

    categoryRecipes = (response.results || []).map(recipe => ({ ...recipe, isFavorite: isFavorite(recipe._id) }));

    rerenderAllCards(categoryRecipes, recipesContainer);
    renderPagination(totalPages, currentPage);
  } catch (error) {
    console.error('Error loading recipes:', error);
    recipesContainer.innerHTML = '<p>Recipes could not be loaded.</p>';
    paginationContainer.innerHTML = '';
  }
}

// --- Kategorileri yükle ---
async function loadCategories() {
  try {
    const categories = await fetchCategories();
    categoryList.innerHTML = categories.map(cat => `
      <li><button class="category-btn ${cat.name === selectedCategory ? 'active' : ''}" data-category="${cat.name}">${cat.name}</button></li>
    `).join('');
  } catch (error) {
    console.error('Failed to load categories:', error);
  }
}

// --- Event listeners ---
categoryList.addEventListener('click', e => {
  const btn = e.target.closest('.category-btn');
  if (!btn) return;
  selectedCategory = btn.dataset.category;
  currentPage = 1;
  categoryList.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
  if (allCategoriesBtn) allCategoriesBtn.classList.remove('active');
  btn.classList.add('active');
  loadAndDisplayCategoryRecipes(currentPage);
});

if (allCategoriesBtn) {
  allCategoriesBtn.addEventListener('click', () => {
    selectedCategory = null;
    currentPage = 1;
    allCategoriesBtn.classList.add('active');
    categoryList.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    loadAndDisplayCategoryRecipes(currentPage);
  });
}

// --- PAGINATION CLICK ---
paginationContainer.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  let page = currentPage;

  switch (true) {
    case btn.classList.contains('first'): page = 1; break;
    case btn.classList.contains('prev'): page = currentPage - 1; break;
    case btn.classList.contains('next'): page = currentPage + 1; break;
    case btn.classList.contains('last'): page = totalPages; break;
    case btn.classList.contains('number'): page = Number(btn.textContent); break;
  }

  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    loadAndDisplayCategoryRecipes(currentPage);
  }
});

// --- Resize ---
window.addEventListener('resize', debounce(() => {
  const newLimit = calculateLimit();
  if (newLimit !== limit) {
    currentPage = 1;
    loadAndDisplayCategoryRecipes(currentPage);
  }
}));

// --- Başlangıç ---
loadCategories();
loadAndDisplayCategoryRecipes();

// --- Yardımcı fonksiyonlar ---
function debounce(func, delay = 250) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function calculateLimit() {
  const width = window.innerWidth;
  if (width < 768) return 6;
  if (width < 1280) return 8;
  return 9;
}
