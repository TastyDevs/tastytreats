import { fetchFilteredRecipes } from '../api/tastyTreatsApi.js';

const recipesContainer = document.querySelector('#recipes-container');
async function loadAndDisplayRecipes() {
  try {
    const response = await fetchFilteredRecipes({ limit: 65 });
    const recipes = response.results;

    if (!recipes || recipes.length === 0) {
      recipesContainer.innerHTML = '<p>No recipes found to display.</p>';
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
          </div>
        </div>
      `;
      })
      .join('');

    recipesContainer.innerHTML = recipesMarkup;
  } catch (error) {
    console.error('An error occurred while loading recipes:', error);
    recipesContainer.innerHTML =
      '<p>The recipes could not be loaded. Please try again later.</p>';
  }
}

loadAndDisplayRecipes();
