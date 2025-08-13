import { fetchRecipeDetails } from '../api/tastyTreatsApi';
import { getFavorites, removeFavorite } from '../js/localFavorites';

// DOM elementleri
const favoritesContainer = document.querySelector(
  '#favorite-recipes-container'
);
const placeholder = document.querySelector('.favorites-placeholder');

async function displayFavorites() {
  try {
    // localStorage'dan favorileri al
    const favoriteInfos = getFavorites();

    // Eğer favori yoksa, placeholder'ı göster
    if (favoriteInfos.length === 0) {
      placeholder.classList.remove('hidden');
      favoritesContainer.classList.add('hidden');
      favoritesContainer.innerHTML = '';
      return;
    }

    //  Her bir ID için API'ye istek atacak bir promise dizisi
    const fetchPromises = favoriteInfos.map(info =>
      fetchRecipeDetails(info._id)
    );

    //  Tüm API isteklerinin tamamlanmasını bekle
    const favoriteRecipes = await Promise.all(fetchPromises);

    placeholder.classList.add('hidden');
    favoritesContainer.classList.remove('hidden');

    const recipesMarkup = favoriteRecipes
      .map(recipe => {
        const ratingValue = ((recipe.rating || 0) / 5) * 100;
        const isActive = 'active';

        return `
        <div class="favorite-recipe-card" data-id="${recipe._id}">
          <button class="heart-btn favorite-heart-btn ${isActive}" aria-label="Remove from favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          
          <img class="favorite-recipe-card-image" src="${
            recipe.thumb || './path-to-your-placeholder-image.jpg'
          }" alt="${recipe.title}" loading="lazy">
          
          <div class="favorite-recipe-card-details">
            <h3 class="recipe-title favorite-recipe-title">${
              recipe.title || 'No Title'
            }</h3>
            <p class="recipe-text favorite-recipe-text">${
              recipe.description || ''
            }</p>
            <div class="favorite-recipe-card-footer">
              <div class="recipe-card-rating rating-box">
                <span class="rating-value">${(recipe.rating || 0).toFixed(
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

    favoritesContainer.innerHTML = recipesMarkup;
  } catch (error) {
    console.error('Favori tarifler yüklenirken bir hata oluştu:', error);
    placeholder.textContent =
      'Tarifler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.';
    placeholder.classList.remove('hidden');
    favoritesContainer.classList.add('hidden');
  }
}

// Kalp butonuna tıklama olayını yöneten fonksiyon

function handleFavoriteRemoval(event) {
  const heartButton = event.target.closest('.favorite-heart-btn');
  if (!heartButton) return;

  const recipeCard = heartButton.closest('.favorite-recipe-card');
  if (!recipeCard) return;

  const recipeId = recipeCard.dataset.id;
  removeFavorite(recipeId);
  displayFavorites();
}

document.addEventListener('DOMContentLoaded', displayFavorites);
favoritesContainer.addEventListener('click', handleFavoriteRemoval);
