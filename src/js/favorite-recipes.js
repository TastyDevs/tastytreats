// Gerekli fonksiyon importları
import { isFavorite, removeFavorite, getFavorites } from '../js/localFavorites';

// DOM elementlerini seç
const favoritesContainer = document.querySelector(
  '#favorite-recipes-container'
);
const placeholder = document.querySelector('.favorites-placeholder');

// Favori tarifleri ekranda gösteren fonksiyon
function displayFavorites() {
  const favoriteRecipes = getFavorites();

  if (favoriteRecipes.length === 0) {
    placeholder.classList.remove('hidden');
    favoritesContainer.classList.add('hidden');

    favoritesContainer.innerHTML = '';
    return;
  }

  placeholder.classList.add('hidden');
  favoritesContainer.classList.remove('hidden');

  const recipesMarkup = favoriteRecipes
    .map(recipe => {
      const ratingValue = (recipe.rating / 5) * 100;
      const isActive = 'active';

      return `
      <div class="favorite-recipe-card" data-id="${recipe._id}">
        <button class="heart-btn favorite-heart-btn ${isActive}" aria-label="Remove from favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        <img class="favorite-recipe-card-image" src="${recipe.thumb}" alt="${
        recipe.title
      }" loading="lazy">
        <div class="favorite-recipe-card-details">
            <h3 class="recipe-title favorite-recipe-title">${recipe.title}</h3>
            <p class="recipe-text favorite-recipe-text">${
              recipe.description
            }</p>
            <div class="favorite-recipe-card-footer">
                <div class="recipe-card-rating rating-box">
                    <span class="rating-value">${recipe.rating.toFixed(
                      1
                    )}</span>
                    <div class="rating-stars " style="--rating: ${ratingValue}%">
                        <span>★★★★★</span>
                        <span class="stars-filled">★★★★★</span>
                    </div>
                </div>
                <button class="see-recipe-btn" type="button">See recipe</button>
            </div>
        </div>
      </div>`;
    })
    .join('');

  // 4. Oluşturulan HTML'i sayfaya yerleştir
  favoritesContainer.innerHTML = recipesMarkup;
}

// Kalp butonuna tıklama olayını yöneten fonksiyon
function handleFavoriteRemoval(event) {
  const heartButton = event.target.closest('.favorite-heart-btn');

  if (!heartButton) {
    return;
  }

  // Tıklanan butonun ait olduğu tarif kartını bul
  const recipeCard = heartButton.closest('.favorite-recipe-card');
  if (!recipeCard) {
    return;
  }

  const recipeId = recipeCard.dataset.id;

  removeFavorite(recipeId);

  displayFavorites();
}

document.addEventListener('DOMContentLoaded', displayFavorites);

favoritesContainer.addEventListener('click', handleFavoriteRemoval);
