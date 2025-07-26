import { fetchPopularRecipes } from '../api/tastyTreatsApi.js';

const popularRecipeContainer = document.querySelector(
  '.popular-recipe-wrapper'
);

console.log(fetchPopularRecipes());

async function displayPopularRecipes() {
  try {
    popularRecipeContainer.innerHTML = `<p>Loading recipes...</p>`;

    const recipes = await fetchPopularRecipes();

    if (!recipes || recipes.length === 0) {
      popularRecipeContainer.innerHTML = `<p>No popular recipes found!</p>`;
      return;
    }
    const markup = recipes
      .map(recipe => {
        return `
    <div class="popular-recipes-card" data-id="${recipe._id}">
    <img class="popular-recipes-image" src="${recipe.preview}" alt="${recipe.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${recipe.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${recipe.description}</p>
      </div>
    </div>
  `;
      })
      .join('');

    popularRecipeContainer.innerHTML = markup;
  } catch (error) {
    console.error('Failed to fetch popular recipes:', error);
    popularRecipeContainer.innerHTML = `<p>Sorry, we could not load the recipes at this time</p>`;
  }
}
displayPopularRecipes();
