import { fetchFilteredRecipes } from '../api/tastyTreatsApi.js';

const recipesContainer = document.querySelector('#recipes-container');
const paginationContainer = document.querySelector('#pagination');

let currentPage = 1;
let totalPages = 1;

const limit = 9;

async function loadAndDisplayRecipes(page = 1) {
  try {
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
        return `
        <div class="recipe-card" data-id="${recipe._id}">
          <img class="recipe-card-image" src="${recipe.thumb}" alt="${
          recipe.title
        }" loading="lazy">
          <div class="recipe-card-content">
            <h3 class="recipe-card-title">${recipe.title}</h3>
            <p class="recipe-card-description">${recipe.description}</p>
            <div class="recipe-card-rating">
              <span>${recipe.rating.toFixed(1)}</span>
            </div>
            <button class="recipe-card-button" type="button">See recipe</button>
          </div>
        </div>
      `;
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

loadAndDisplayRecipes();

window.addEventListener('resize', () => {
  loadAndDisplayRecipes(currentPage);
});
