// Gerekli fonksiyon importları
import { removeFavorite, getFavorites } from '../js/localFavorites';

// DOM elementlerini seç
const favoritesContainer = document.querySelector(
  '#favorite-recipes-container'
);
const placeholder = document.querySelector('.favorites-placeholder');
const categoriesFilterContainer = document.querySelector('.categories-filter');

// Kategori Filtreleme Butonları

function displayCategoryFilters() {
  const favoriteRecipes = getFavorites();
  const categories = [
    ...new Set(favoriteRecipes.map(recipe => recipe.category)),
  ];

  let buttonsMarkup = `<button class="categories-box category-btn active" type="button">All categories</button>`;

  categories.forEach(category => {
    buttonsMarkup += `
      <button class="categories-box category-btn" type="button">
        ${category}
      </button>
      `;
  });

  categoriesFilterContainer.innerHTML = buttonsMarkup;
}

// Favori tarifleri ekranda gösteren fonksiyon
function displayFavorites(filterCategory = `All categories`) {
  let favoriteRecipes = getFavorites();

  if (filterCategory !== `All categories`) {
    favoriteRecipes = favoriteRecipes.filter(
      recipe => recipe.category === filterCategory
    );
  }

  if (favoriteRecipes.length === 0) {
    if (filterCategory === `All categories`) {
      placeholder.classList.remove(`hidden`);
      favoritesContainer.classList.add(`hidden`);
      categoriesFilterContainer.classList.add(`hidden`);
    } else {
      placeholder.classList.add(`hidden`);
      favoritesContainer.classList.remove(`hidden`);
    }

    favoritesContainer.innerHTML = '';
    return;
  }

  placeholder.classList.add('hidden');
  favoritesContainer.classList.remove('hidden');
  categoriesFilterContainer.classList.remove('hidden');

  const recipesMarkup = favoriteRecipes
    .map(recipe => {
      const ratingValue = (recipe.rating / 5) * 100;

      return `
   <div class="favorite-recipe-card" data-id="${recipe._id}" data-category="${
        recipe.category
      }">
        <button class="heart-btn favorite-heart-btn active" aria-label="Remove from favorites">
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

  //  Oluşturulan HTML'i sayfaya yerleştir
  favoritesContainer.innerHTML = recipesMarkup;
}

// Kalp butonuna tıklama olayını yöneten fonksiyon
function handleFavoriteRemoval(event) {
  const heartButton = event.target.closest('.favorite-heart-btn');
  if (!heartButton) return;

  const recipeCard = heartButton.closest('.favorite-recipe-card');
  if (!recipeCard) return;

  const activeCategoryBtn = document.querySelector('.category-btn.active');

  const currentCategoryFilter = activeCategoryBtn
    ? activeCategoryBtn.textContent.trim()
    : 'All categories';

  const recipeId = recipeCard.dataset.id;
  removeFavorite(recipeId);

  displayCategoryFilters();

  const newCategoryBtns =
    categoriesFilterContainer.querySelectorAll('.category-btn');
  let categoryStillExists = false;

  newCategoryBtns.forEach(btn => {
    if (btn.textContent.trim() === currentCategoryFilter) {
      categoryStillExists = true;
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (!categoryStillExists) {
    const allCategoriesBtn =
      categoriesFilterContainer.querySelector('.category-btn');
    if (allCategoriesBtn) {
      allCategoriesBtn.classList.add('active');
    }
    displayFavorites('All categories');
  } else {
    displayFavorites(currentCategoryFilter);
  }
}

function handleCategoryFilter(event) {
  if (!event.target.matches('.category-btn')) return;

  const selectedCategory = event.target.textContent.trim();

  categoriesFilterContainer.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  event.target.classList.add('active');

  displayFavorites(selectedCategory);
}

function initializePage() {
  displayCategoryFilters();
  displayFavorites();
}

const slider = document.querySelector('.categories-filter');

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('grabbing');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('grabbing');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('grabbing');
});

slider.addEventListener('mousemove', e => {
  if (!isDown) return;

  e.preventDefault();

  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;

  slider.scrollLeft = scrollLeft - walk;
});

document.addEventListener('DOMContentLoaded', initializePage);
favoritesContainer.addEventListener('click', handleFavoriteRemoval);
categoriesFilterContainer.addEventListener('click', handleCategoryFilter);
