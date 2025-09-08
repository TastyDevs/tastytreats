// Gerekli fonksiyon importları
import { removeFavorite, getFavorites } from '../js/localFavorites';

// DOM elementlerini seç
const favoritesContainer = document.querySelector(
  '#favorite-recipes-container'
);
const placeholder = document.querySelector('.favorites-placeholder');
const categoriesFilterContainer = document.querySelector('.categories-filter');
const paginationContainer = document.querySelector('#favorites-pagination');

let currentPage = 1;
let totalPages = 1;

//  SVG ikon nesnesi
const PAGINATION_ICONS = {
  first:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>',
  prev: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
  next: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
  last: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>',
};

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

// Sayfa başı görünecek olan tarif sayısı
function getItemsPerPage() {
  const width = window.innerWidth;

  if (width >= 1440) {
    return 15;
  } else if (width >= 768) {
    return 12;
  } else {
    return 9;
  }
}

function renderPagination() {
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
  fragment.appendChild(
    createBtn(
      PAGINATION_ICONS.first,
      'pagination-btn prev-first',
      currentPage === 1
    )
  );
  fragment.appendChild(
    createBtn(PAGINATION_ICONS.prev, 'pagination-btn prev', currentPage === 1)
  );

  // Dinamik sayfa numaraları oluşturma
  const pagesToShow = new Set();
  pagesToShow.add(1);
  pagesToShow.add(totalPages);
  pagesToShow.add(currentPage);

  if (currentPage > 1) pagesToShow.add(currentPage - 1);
  if (currentPage < totalPages) pagesToShow.add(currentPage + 1);

  const sortedPages = Array.from(pagesToShow)
    .filter(num => num > 0 && num <= totalPages)
    .sort((a, b) => a - b);

  let lastPage = 0;
  for (const pageNum of sortedPages) {
    if (lastPage !== 0 && pageNum > lastPage + 1) {
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      ellipsis.className = 'pagination-ellipsis';
      fragment.appendChild(ellipsis);
    }

    const btn = createBtn(pageNum, 'pagination-number');
    if (pageNum === currentPage) {
      btn.classList.add('active');
    }
    fragment.appendChild(btn);
    lastPage = pageNum;
  }

  // > ve >> butonları
  fragment.appendChild(
    createBtn(
      PAGINATION_ICONS.next,
      'pagination-btn next',
      currentPage === totalPages
    )
  );
  fragment.appendChild(
    createBtn(
      PAGINATION_ICONS.last,
      'pagination-btn next-last',
      currentPage === totalPages
    )
  );

  paginationContainer.appendChild(fragment);
}

// Favori tarifleri ekranda gösteren fonksiyon
function displayFavorites(filterCategory = `All categories`, page = 1) {
  let favoriteRecipes = getFavorites();

  if (filterCategory !== `All categories`) {
    favoriteRecipes = favoriteRecipes.filter(
      recipe => recipe.category === filterCategory
    );
  }

  const itemsPerPage = getItemsPerPage();
  totalPages = Math.ceil(favoriteRecipes.length / itemsPerPage);
  currentPage = page;

  if (favoriteRecipes.length === 0) {
    placeholder.classList.remove(`hidden`);
    favoritesContainer.classList.add(`hidden`);
    categoriesFilterContainer.classList.add(`hidden`);
    paginationContainer.innerHTML = '';
    return;
  }

  placeholder.classList.add('hidden');
  favoritesContainer.classList.remove('hidden');
  categoriesFilterContainer.classList.remove('hidden');

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedRecipes = favoriteRecipes.slice(start, end);

  const recipesMarkup = paginatedRecipes
    .map(recipe => {
      const ratingValue = (recipe.rating / 5) * 100;
      return `
      <div class="favorite-recipe-card recipe-card" data-id="${
        recipe._id
      }" data-category="${recipe.category}">
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
          <p class="recipe-text favorite-recipe-text">${recipe.description}</p>
          <div class="favorite-recipe-card-footer">
            <div class="recipe-card-rating rating-box">
              <span class="rating-value">${(recipe.rating || 0).toFixed(
                1
              )}</span>
              <div class="rating-stars" style="--rating: ${ratingValue}%">
                <span>★★★★★</span>
                <span class="stars-filled">★★★★★</span>
              </div>
            </div>
            <button class="see-recipe-btn recipe-card-button " type="button">See recipe</button>
          </div>
        </div>
      </div>
    `;
    })
    .join('');

  favoritesContainer.innerHTML = recipesMarkup;
  renderPagination();
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

  let pageToDisplay = currentPage;

  removeFavorite(recipeId);
  displayCategoryFilters();

  let remainingFavorites = getFavorites();
  if (currentCategoryFilter !== 'All categories') {
    remainingFavorites = remainingFavorites.filter(
      recipe => recipe.category === currentCategoryFilter
    );
  }
  const itemsPerPage = getItemsPerPage();
  const newTotalPages = Math.ceil(remainingFavorites.length / itemsPerPage);

  if (pageToDisplay > newTotalPages) {
    pageToDisplay = newTotalPages || 1;
  }

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
    if (allCategoriesBtn) allCategoriesBtn.classList.add('active');
    displayFavorites('All categories', 1);
  } else {
    displayFavorites(currentCategoryFilter, pageToDisplay);
  }
}

function handleCategoryFilter(event) {
  if (!event.target.matches('.category-btn')) return;
  const selectedCategory = event.target.textContent.trim();

  categoriesFilterContainer.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  event.target.classList.add('active');
  displayFavorites(selectedCategory, 1);
}

// Pagination click events
paginationContainer.addEventListener('click', e => {
  const clickedButton = e.target.closest('.pagination-btn, .pagination-number');
  if (!clickedButton) return;

  if (clickedButton.classList.contains('pagination-number')) {
    displayFavorites(getActiveCategory(), Number(clickedButton.textContent));
  }
  if (clickedButton.classList.contains('prev-first')) {
    displayFavorites(getActiveCategory(), 1);
  }
  if (clickedButton.classList.contains('prev')) {
    if (currentPage > 1) displayFavorites(getActiveCategory(), currentPage - 1);
  }
  if (clickedButton.classList.contains('next')) {
    if (currentPage < totalPages)
      displayFavorites(getActiveCategory(), currentPage + 1);
  }
  if (clickedButton.classList.contains('next-last')) {
    displayFavorites(getActiveCategory(), totalPages);
  }
});

function getActiveCategory() {
  const activeCategoryBtn = document.querySelector('.category-btn.active');
  return activeCategoryBtn
    ? activeCategoryBtn.textContent.trim()
    : 'All categories';
}

// Sayfa ilk açıldığında
function initializePage() {
  displayCategoryFilters();
  displayFavorites();
}

// Kategori filtre slider mouse scroll
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
window.addEventListener('resize', () => {
  displayFavorites(getActiveCategory(), 1);
});
