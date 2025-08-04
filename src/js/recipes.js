import { fetchFilteredRecipes } from '../api/tastyTreatsApi.js';

const recipesContainer = document.querySelector('#recipes-container');
const paginationContainer = document.querySelector('#pagination');

let currentPage = 1;
let totalPages = 1;
let limit = calculateLimit();

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
    const recipes = response.results;
    totalPages =
      response.totalPages || Math.ceil(response.totalResults / limit);

    if (!recipes || recipes.length === 0) {
      recipesContainer.innerHTML = '<p>No recipes found to display.</p>';
      paginationContainer.innerHTML = '';
      return;
    }

    const recipesMarkup = recipes
      .map(recipe => {
        const ratingValue = (recipe.rating / 5) * 100;
        return `
        <div class="recipe-card" data-id="${recipe._id}">
          <button class="heart-btn" aria-label="Add to favorites">
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

function renderPagination(total, current) {
  let buttonsMarkup = '';

  for (let i = 1; i <= total; i++) {
    buttonsMarkup += `<button class="pagination-btn ${
      i === current ? 'active' : ''
    }" data-page="${i}">${i}</button>`;
  }

  paginationContainer.innerHTML = buttonsMarkup;

  const allButtons = paginationContainer.querySelectorAll('.pagination-btn');
  allButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedPage = Number(btn.dataset.page);
      if (selectedPage !== currentPage) {
        currentPage = selectedPage;
        loadAndDisplayRecipes(currentPage);
      }
    });
  });
}

window.addEventListener('resize', () => {
  const newLimit = calculateLimit();
  if (newLimit !== limit) {
    currentPage = 1;
    loadAndDisplayRecipes(currentPage);
  }
});

loadAndDisplayRecipes();
