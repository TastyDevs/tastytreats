import { fetchFilteredRecipes } from '../api/tastyTreatsApi.js';
import { toggleFavorite, isFavorite } from '../utils/localFavorites.js';

const recipesContainer = document.querySelector('#recipes-container');
const paginationContainer = document.querySelector('#pagination');
let currentRecipes = [];

let currentPage = 1;
let totalPages = 1;
let limit = calculateLimit();

function debounce(func, delay = 250) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function calculateLimit() {
  const width = window.innerWidth;
  if (width < 768) return 6;
  if (width < 1280) return 8;
  return 9;
}

async function loadAndDisplayRecipes(page = 1) {
  try {
    limit = calculateLimit();
    const response = await fetchFilteredRecipes({ page, limit });
    currentRecipes = response.results;

    totalPages =
      response.totalPages || Math.ceil(response.totalResults / limit);

    if (!currentRecipes || currentRecipes.length === 0) {
      recipesContainer.innerHTML = '<p>No recipes found to display.</p>';
      paginationContainer.innerHTML = '';
      return;
    }

    const recipesMarkup = currentRecipes
      .map(recipe => {
        const ratingValue = (recipe.rating / 5) * 100;
        const isActive = isFavorite(recipe._id) ? 'active' : '';
        return `
        <div class="recipe-card" data-id="${recipe._id}">
          <button class="heart-btn ${isActive}" aria-label="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img class="recipe-card-image" src="${recipe.thumb}" alt="${
          recipe.title
        }" loading="lazy">
          <div class="recipe-card-details">
            <h3 class="recipe-card-title">${recipe.title}</h3>
            <p class="recipe-card-description">${recipe.description}</p>
            <div class="recipe-card-footer">
              <div class="recipe-card-rating">
                <span class="rating-value">${recipe.rating.toFixed(1)}</span>
                <div class="rating-stars" style="--rating: ${ratingValue}%">
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

    recipesContainer.innerHTML = recipesMarkup;
    renderPagination(totalPages, page);
  } catch (error) {
    console.error('An error occurred while loading recipes:', error);
    recipesContainer.innerHTML =
      '<p>The recipes could not be loaded. Please try again later.</p>';
    paginationContainer.innerHTML = '';
  }
}

paginationContainer.addEventListener('click', event => {
  const btn = event.target.closest('.pagination-btn');
  if (!btn || btn.disabled || !btn.dataset.page) return;

  const selectedPage = Number(btn.dataset.page);
  if (selectedPage !== currentPage) {
    currentPage = selectedPage;
    loadAndDisplayRecipes(currentPage);
  }
});

recipesContainer.addEventListener('click', event => {
  const heartBtn = event.target.closest('.heart-btn');
  if (!heartBtn) return;
  const recipeCard = heartBtn.closest('.recipe-card');
  const recipeId = recipeCard.dataset.id;
  const recipe = currentRecipes.find(r => r._id === recipeId);
  if (!recipe) return;
  toggleFavorite(recipe);
  requestAnimationFrame(() => {
    heartBtn.classList.toggle('active');
  });
});

function renderPagination(totalPages, currentPage) {
  let markup = '';
  const pagesToShow = 1;
  const arrowClassesPrev = 'pagination-btn arrow-btn arrow-prev';
  const arrowClassesNext = 'pagination-btn arrow-btn arrow-next';
  markup += `<button class="${arrowClassesPrev}" data-page="1" ${
    currentPage === 1 ? 'disabled' : ''
  }><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg></button>`;
  markup += `<button class="${arrowClassesPrev}" data-page="${
    currentPage - 1
  }" ${
    currentPage === 1 ? 'disabled' : ''
  }><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`;
  if (totalPages > 1) {
    if (currentPage > pagesToShow + 2) {
      markup += `<button class="pagination-btn page-btn" data-page="1">1</button>`;
      markup += `<button class="pagination-btn dots">...</button>`;
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
      markup += `<button class="pagination-btn dots">...</button>`;
      markup += `<button class="pagination-btn page-btn" data-page="${totalPages}">${totalPages}</button>`;
    }
  }
  markup += `<button class="${arrowClassesNext}" data-page="${
    currentPage + 1
  }" ${
    currentPage === totalPages ? 'disabled' : ''
  }><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>`;
  markup += `<button class="${arrowClassesNext}" data-page="${totalPages}" ${
    currentPage === totalPages ? 'disabled' : ''
  }><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg></button>`;
  paginationContainer.innerHTML = markup;
}

const handleResize = debounce(() => {
  const newLimit = calculateLimit();
  if (newLimit !== limit) {
    currentPage = 1;
    loadAndDisplayRecipes(currentPage);
  }
});

window.addEventListener('resize', handleResize);

loadAndDisplayRecipes();
